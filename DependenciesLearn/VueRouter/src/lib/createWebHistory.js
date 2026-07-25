// 作用：移除路径末尾斜杠
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');



// 这段代码用于在浏览器环境中自动检测和处理 <base> 标签，以确定应用的基路径。
// <head>
//   <base href="https://example.com/app/">
// </head>
// 啥都不传 或 传 /  最后均得到 ''
// 传 /my-app/  最后均得到 '/my-app'
// 传 my-app/  最后均得到 '/my-app'
// 传 /folder#end  最后均得到 '/folder#end'
function normalizeBase(base) {
  if (!base) {
      if (isBrowser) {
          // respect <base> tag
          const baseEl = document.querySelector('base');
          base = (baseEl && baseEl.getAttribute('href')) || '/';

          // 如 上面的  "https://example.com/app/"  最终下面的表达式会匹配   https://example.com/
          base = base.replace(/^\w+:\/\/[^\/]+/, '');
      }
      else {
          base = '/';
      }
  }
  if (base[0] !== '/' && base[0] !== '#')
      base = '/' + base;
  return removeTrailingSlash(base);
}



let createBaseLocation = () => location.protocol + '//' + location.host;



// 第一个 ^  表示 字符串开头
// 第二个 ^  表示 非[]中的任意一个
// 如：'/app#/' 中 /app# 会被匹配
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
  return base.replace(BEFORE_HASH_RE, '#') + location;
}



function stripBase(pathname, base) {
  // no base or base is not found at the beginning
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
  return pathname.slice(base.length) || '/';
}



function createCurrentLocation(base, location) {
  const { pathname, search, hash } = location;
  // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
  const hashPos = base.indexOf('#');
  if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos))
          ? base.slice(hashPos).length
          : 1;
      let pathFromHash = hash.slice(slicePos);
      // prepend the starting slash to hash so the url starts with /#
      if (pathFromHash[0] !== '/')
          pathFromHash = '/' + pathFromHash;
      return stripBase(pathFromHash, '');
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}



function useHistoryStateNavigation(base) {
  const { history, location } = window;

  const currentLocation = {
      value: createCurrentLocation(base, location),
  };

  // 最初始时，  history.state 为 null
  const historyState = { value: history.state };
  // build current history entry as this is a fresh navigation
  if (!historyState.value) {
      changeLocation(currentLocation.value, {
          back: null,
          current: currentLocation.value,
          forward: null,
          // the length is off by one, we need to decrease it
          position: history.length - 1,
          replaced: true,
          // don't add a scroll as the user may have an anchor, and we want
          // scrollBehavior to be triggered without a saved position
          scroll: null,
      }, true);
  }
  function changeLocation(to, state, replace) {
      /**
       * if a base tag is provided, and we are on a normal domain, we have to
       * respect the provided `base` attribute because pushState() will use it and
       * potentially erase anything before the `#` like at
       * https://github.com/vuejs/router/issues/685 where a base of
       * `/folder/#` but a base of `/` would erase the `/folder/` section. If
       * there is no host, the `<base>` tag makes no sense and if there isn't a
       * base tag we can just use everything after the `#`.
       */
      const hashIndex = base.indexOf('#');
      const url = hashIndex > -1
          ? (location.host && document.querySelector('base')
              ? base
              : base.slice(hashIndex)) + to
          : createBaseLocation() + base + to;
      try {
          // BROWSER QUIRK
          // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
          history[replace ? 'replaceState' : 'pushState'](state, '', url);
          historyState.value = state;
      }
      catch (err) {
          if ((process.env.NODE_ENV !== 'production')) {
              warn('Error with push/replace State', err);
          }
          else {
              console.error(err);
          }
          // Force the navigation, this also resets the call count
          location[replace ? 'replace' : 'assign'](url);
      }
  }
  function replace(to, data) {
      const state = assign({}, history.state, buildState(historyState.value.back, 
      // keep back and forward entries but override current position
      to, historyState.value.forward, true), data, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
  }
  function push(to, data) {
      // Add to current entry the information of where we are going
      // as well as saving the current position
      const currentState = assign({}, 
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value, history.state, {
          forward: to,
          scroll: computeScrollPosition(),
      });
      if ((process.env.NODE_ENV !== 'production') && !history.state) {
          warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\n` +
              `history.replaceState(history.state, '', url)\n\n` +
              `You can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state`);
      }
      changeLocation(currentState.current, currentState, true);
      const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
  }
  return {
      location: currentLocation,
      state: historyState,
      push,
      replace,
  };
}



function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  // TODO: should it be a stack? a Dict. Check if the popstate listener
  // can trigger twice
  let pauseState = null;
  const popStateHandler = ({ state, }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
          currentLocation.value = to;
          historyState.value = state;
          // ignore the popstate and reset the pauseState
          if (pauseState && pauseState === from) {
              pauseState = null;
              return;
          }
          delta = fromState ? state.position - fromState.position : 0;
      }
      else {
          replace(to);
      }
      // Here we could also revert the navigation by calling history.go(-delta)
      // this listener will have to be adapted to not trigger again and to wait for the url
      // to be updated before triggering the listeners. Some kind of validation function would also
      // need to be passed to the listeners so the navigation can be accepted
      // call all listeners
      listeners.forEach(listener => {
          listener(currentLocation.value, from, {
              delta,
              type: NavigationType.pop,
              direction: delta
                  ? delta > 0
                      ? NavigationDirection.forward
                      : NavigationDirection.back
                  : NavigationDirection.unknown,
          });
      });
  };
  function pauseListeners() {
      pauseState = currentLocation.value;
  }
  function listen(callback) {
      // set up the listener and prepare teardown callbacks
      listeners.push(callback);
      const teardown = () => {
          const index = listeners.indexOf(callback);
          if (index > -1)
              listeners.splice(index, 1);
      };
      teardowns.push(teardown);
      return teardown;
  }
  function beforeUnloadListener() {
      if (document.visibilityState === 'hidden') {
          const { history } = window;
          if (!history.state)
              return;
          history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), '');
      }
  }
  function destroy() {
      for (const teardown of teardowns)
          teardown();
      teardowns = [];
      window.removeEventListener('popstate', popStateHandler);
      window.removeEventListener('pagehide', beforeUnloadListener);
      document.removeEventListener('visibilitychange', beforeUnloadListener);
  }
  // set up the listeners and prepare teardown callbacks
  window.addEventListener('popstate', popStateHandler);
  // https://developer.chrome.com/blog/page-lifecycle-api/
  // note: iOS safari does not fire beforeunload, so we
  // use pagehide and visibilitychange instead
  window.addEventListener('pagehide', beforeUnloadListener);
  document.addEventListener('visibilitychange', beforeUnloadListener);
  return {
      pauseListeners,
      listen,
      destroy,
  };
}



const assign = Object.assign;



function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
      if (!triggerListeners)
          historyListeners.pauseListeners();
      history.go(delta);
  }
  const routerHistory = assign({
      // it's overridden right after
      location: '',
      base,
      go,
      createHref: createHref.bind(null, base),
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, 'location', {
      enumerable: true,
      get: () => historyNavigation.location.value,
  });
  Object.defineProperty(routerHistory, 'state', {
      enumerable: true,
      get: () => historyNavigation.state.value,
  });
  return routerHistory;
}


createWebHistory('/my-app/')

