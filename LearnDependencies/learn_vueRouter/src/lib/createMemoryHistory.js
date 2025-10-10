// 浏览器环境下 为 true       其他环境为 false
const isBrowser = typeof document !== 'undefined';



// 作用：移除路径末尾斜杠
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');



const START = '';



// 生成对象  {pop: 'pop', push: 'push'}
var NavigationType;
(function (NavigationType) {
    NavigationType["pop"] = "pop";
    NavigationType["push"] = "push";
})(NavigationType || (NavigationType = {}));




// 第一个 ^  表示 字符串开头
// 第二个 ^  表示 非[]中的任意一个
// 如：'/app#/' 中 /app# 会被匹配
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
  return base.replace(BEFORE_HASH_RE, '#') + location;
}



function normalizeBase(base) {
  if (!base) {
      if (isBrowser) {
          // respect <base> tag
          const baseEl = document.querySelector('base');
          base = (baseEl && baseEl.getAttribute('href')) || '/';
          // strip full URL origin
          base = base.replace(/^\w+:\/\/[^\/]+/, '');
      }
      else {
          base = '/';
      }
  }
  // ensure leading slash when it was removed by the regex above avoid leading
  // slash with hash because the file could be read from the disk like file://
  // and the leading slash would cause problems
  if (base[0] !== '/' && base[0] !== '#')
      base = '/' + base;
  // remove the trailing slash so all other method can just do `base + fullPath`
  // to build an href
  return removeTrailingSlash(base);
}



function createMemoryHistory(base = '') {
  let listeners = [];
  let queue = [[START, {}]];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location, state = {}) {
      position++;
      if (position !== queue.length) {
          // we are in the middle, we remove everything from here in the queue
          queue.splice(position);
      }
      queue.push([location, state]);
  }
  function triggerListeners(to, from, { direction, delta }) {
      const info = {
          direction,
          delta,
          type: NavigationType.pop,
      };
      for (const callback of listeners) {
          callback(to, from, info);
      }
  }
  
  const routerHistory = {
      // rewritten by Object.defineProperty
      location: START,
      // rewritten by Object.defineProperty
      state: {},
      base,
      createHref: createHref.bind(null, base),
      replace(to, state) {
          // remove current entry and decrement position
          queue.splice(position--, 1);
          setLocation(to, state);
      },
      push(to, state) {
          setLocation(to, state);
      },
      listen(callback) {
          listeners.push(callback);
          return () => {
              const index = listeners.indexOf(callback);
              if (index > -1)
                  listeners.splice(index, 1);
          };
      },
      destroy() {
          listeners = [];
          queue = [[START, {}]];
          position = 0;
      },
      go(delta, shouldTrigger = true) {
          const from = this.location;
          const direction = 
          // we are considering delta === 0 going forward, but in abstract mode
          // using 0 for the delta doesn't make sense like it does in html5 where
          // it reloads the page
          delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
          position = Math.max(0, Math.min(position + delta, queue.length - 1));
          if (shouldTrigger) {
              triggerListeners(this.location, from, {
                  direction,
                  delta,
              });
          }
      },
  };
  Object.defineProperty(routerHistory, 'location', {
      enumerable: true,
      get: () => queue[position][0],
  });
  Object.defineProperty(routerHistory, 'state', {
      enumerable: true,
      get: () => queue[position][1],
  });

  return routerHistory;
}

console.log(createMemoryHistory())
