function warn(msg) {
  // avoid using ...args as it breaks in older Edge builds
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}

function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}

/**
 * Normalizes a RouteRecordRaw. Creates a copy
 *
 * @param record
 * @returns the normalized version
 */
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component },
  };
  // mods contain modules and shouldn't be copied,
  // logged or anything. It's just used for internal
  // advanced use cases like data loaders
  Object.defineProperty(normalized, "mods", {
    value: {},
  });
  return normalized;
}

/**
 * A route with a name and a child with an empty path without a name should warn when adding the route
 *
 * @param mainNormalizedRecord - RouteRecordNormalized
 * @param parent - RouteRecordMatcher
 */
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}

/**
 * Creates a Router Matcher.
 *
 * @internal
 * @param routes - array of initial routes
 * @param globalOptions - global route options
 */
function createRouterMatcher(routes, globalOptions) {
  // normalized ordered array of matchers
  const matchers = [];
  const matcherMap = new Map();

  // globalOptions 即为 createRouter 中的传参， 此处既是根据 globalOptions  修改  传参中第一个参数的 strict、end、sensitive
  // defaults { strict: false, end: true, sensitive: false }
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);

  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    // used later on to remove by name
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    if (process.env.NODE_ENV !== "production") {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    // we might be the child of an alias
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;

    // record 即为 自定义的 路由数组， 此处既是根据 record  修改 globalOptions 的 strict、end、sensitive
    const options = mergeOptions(globalOptions, record);

    // generate an array of records to correctly handle aliases
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(
          // we need to normalize again to ensure the `mods` property
          // being non enumerable
          normalizeRouteRecord(
            assign({}, mainNormalizedRecord, {
              // this allows us to hold a copy of the `components` option
              // so that async components cache is hold on the original record
              components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
              path: alias,
              // we might be the child of an alias
              aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord,
              // the aliases are always of the same kind as the original since they
              // are defined on the same record
            })
          )
        );
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      // Build up the path for nested routes if the child isn't an absolute
      // route. Only add the / delimiter if the child path isn't empty and if the
      // parent path doesn't have a trailing slash
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (process.env.NODE_ENV !== "production" && normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\n' + "See more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.");
      }
      // create the object beforehand, so it can be passed to children
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (process.env.NODE_ENV !== "production" && parent && path[0] === "/") checkMissingParamsInAbsolutePath(matcher, parent);
      // if we are an alias we must tell the original record that we exist,
      // so we can be removed
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        if (process.env.NODE_ENV !== "production") {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        // otherwise, the first record is the original and others are aliases
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        // remove the route if named and only for the top record (avoid in nested calls)
        // this works because the original record is the first one
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          if (process.env.NODE_ENV !== "production") {
            checkSameNameAsAncestor(record, parent);
          }
          removeRoute(record.name);
        }
      }
      // Avoid adding a record that doesn't display anything. This allows passing through records without a component to
      // not be reached and pass through the catch all route
      if (isMatchable(matcher)) {
        insertMatcher(matcher);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      // if there was no original record, then the first one was not an alias and all
      // other aliases (if any) need to reference this record when adding children
      originalRecord = originalRecord || matcher;
      // TODO: add normalized records for more flexibility
      // if (parent && isAliasRecord(originalRecord)) {
      //   parent.children.push(originalRecord)
      // }
    }
    return originalMatcher
      ? () => {
          // since other matchers are aliases, they should be removed by the original matcher
          removeRoute(originalMatcher);
        }
      : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    // only add the original record to the name map
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location && location.name) {
      matcher = matcherMap.get(location.name);
      if (!matcher)
        throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
          location,
        });
      // warn if the user is passing invalid params so they can debug it better when they get removed
      if (process.env.NODE_ENV !== "production") {
        const invalidParams = Object.keys(location.params || {}).filter(paramName => !matcher.keys.find(k => k.name === paramName));
        if (invalidParams.length) {
          warn(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
        }
      }
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          matcher.keys
            .filter(k => !k.optional)
            .concat(matcher.parent ? matcher.parent.keys.filter(k => k.optional) : [])
            .map(k => k.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location.params &&
          paramsFromLocation(
            location.params,
            matcher.keys.map(k => k.name)
          )
      );
      // throws if cannot be stringified
      path = matcher.stringify(params);
    } else if (location.path != null) {
      // no need to resolve the path with the matcher as it was provided
      // this also allows the user to control the encoding
      path = location.path;
      if (process.env.NODE_ENV !== "production" && !path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`);
      }
      matcher = matchers.find(m => m.re.test(path));
      // matcher should have a value after the loop
      if (matcher) {
        // we know the matcher works because we tested the regexp
        params = matcher.parse(path);
        name = matcher.record.name;
      }
      // location is a relative path
    } else {
      // match by name or path of current route
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find(m => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
          location,
          currentLocation,
        });
      name = matcher.record.name;
      // since we are navigating to the same location, we don't need to pick the
      // params like when `name` is provided
      params = assign({}, currentLocation.params, location.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      // reversed order so parents are at the beginning
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched),
    };
  }

  // add initial routes
  routes.forEach(route => addRoute(route));

  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher,
  };
}

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
  const query = {};
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === "" || search === "?") return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    // allow the = character
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
/**
 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      // only null adds the value
      if (value !== undefined) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    // keep null values
    const values = isArray(value) ? value.map(v => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach(value => {
      // skip undefined values in arrays as if they were not present
      // smaller code than using filter
      if (value !== undefined) {
        // only append & with non-empty search
        search += (search.length ? "&" : "") + key;
        if (value != null) search += "=" + value;
      }
    });
  }
  return search;
}

/**
 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
 */
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset,
  };
}

function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}

const assign = Object.assign;

const encodeParams = applyToParams.bind(null, encodeParam);

const normalizeParams = applyToParams.bind(null, paramValue => "" + paramValue);

// TODO: we could allow currentRoute as a prop to expose `isActive` and
// `isExactActive` behavior should go through an RFC
/**
 * Returns the internal behavior of a {@link RouterLink} without the rendering part.
 *
 * @param props - a `to` location and an optional `replace` flag
 */
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = computed(() => {
    const to = unref(props.to);
    if (process.env.NODE_ENV !== "production" && (!hasPrevious || to !== previousTo)) {
      if (!isRouteLocation(to)) {
        if (hasPrevious) {
          warn(`Invalid value for prop "to" in useLink()\n- to:`, to, `\n- previous to:`, previousTo, `\n- props:`, props);
        } else {
          warn(`Invalid value for prop "to" in useLink()\n- to:`, to, `\n- props:`, props);
        }
      }
      previousTo = to;
      hasPrevious = true;
    }
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    // possible parent record
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 &&
        // if the parent and matched route have the same path, this link is
        // referring to the empty child. Or we currently are on a different
        // child of the same parent
        getOriginalPath(routeMatched) === parentRecordPath &&
        // avoid comparing the child with its parent
        currentMatched[currentMatched.length - 1].path !== parentRecordPath
        ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]))
        : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
        document.startViewTransition(() => p);
      }
      return p;
    }
    return Promise.resolve();
  }
  // devtools only
  if ((process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value,
        error: null,
      };
      // @ts-expect-error: this is internal
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      // @ts-expect-error: this is internal
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(
        () => {
          linkContextDevtools.route = route.value;
          linkContextDevtools.isActive = isActive.value;
          linkContextDevtools.isExactActive = isExactActive.value;
          linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : 'Invalid "to" value';
        },
        { flush: "post" }
      );
    }
  }
  /**
   * NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
   */
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate,
  };
}

const RouterLinkImpl = /*#__PURE__*/ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page",
    },
    viewTransition: Boolean,
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive,
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom
        ? children
        : h(
            "a",
            {
              "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
              href: link.href,
              // this would override user added attrs but Vue will still add
              // the listener, so we end up triggering both
              onClick: link.navigate,
              class: elClass.value,
            },
            children
          );
    };
  },
});
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to render a link that triggers a navigation on click.
 */
const RouterLink = RouterLinkImpl;

const RouterViewImpl = /*#__PURE__*/ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default",
    },
    route: Object,
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    process.env.NODE_ENV !== "production" && warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
    // that are used to reuse the `path` property
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(
      viewDepthKey,
      computed(() => depth.value + 1)
    );
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    // watch at the same time the component instance, the route record we are
    // rendering, and the name
    watch(
      () => [viewRef.value, matchedRouteRef.value, props.name],
      ([instance, to, name], [oldInstance, from, oldName]) => {
        // copy reused instances
        if (to) {
          // this will update the instance for new instances as well as reused
          // instances when navigating to a new route
          to.instances[name] = instance;
          // the component instance is reused for a different route or name, so
          // we copy any saved update or leave guards. With async setup, the
          // mounting component will mount before the matchedRoute changes,
          // making instance === oldInstance, so we check if guards have been
          // added before. This works because we remove guards when
          // unmounting/deactivating components
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        // trigger beforeRouteEnter next callbacks
        if (
          instance &&
          to &&
          // if there is no instance but to and from are the same this might be
          // the first visit
          (!from || !isSameRouteRecord(to, from) || !oldInstance)
        ) {
          (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
        }
      },
      { flush: "post" }
    );
    return () => {
      const route = routeToDisplay.value;
      // we need the value at the time we render because when we unmount, we
      // navigated to a different location so the value is different
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      // props from route configuration
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? (routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption) : null;
      const onVnodeUnmounted = vnode => {
        // remove the instance reference to prevent leak
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(
        ViewComponent,
        assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef,
        })
      );
      if ((process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && isBrowser && component.ref) {
        // TODO: can display if it's an alias, its props
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta,
        };
        const internalInstances = isArray(component.ref) ? component.ref.map(r => r.i) : [component.ref.i];
        internalInstances.forEach(instance => {
          // @ts-expect-error
          instance.__vrv_devtools = info;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  },
});
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to display the current route the user is at.
 */
const RouterView = RouterViewImpl;

/**
 * Creates a Router instance that can be used by a Vue app.
 *
 * @param options - {@link RouterOptions}
 */
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (process.env.NODE_ENV !== "production" && !routerHistory) throw new Error('Provide the "history" option when calling "createRouter()":' + " https://router.vuejs.org/api/interfaces/RouterOptions.html#history");
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  // leave the scrollRestoration if no scrollBehavior is provided
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, paramValue => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams =
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (process.env.NODE_ENV !== "production" && !parent) {
        warn(`Parent route "${String(parentOrRoute)}" not found when adding child route`, route);
      }
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else if (process.env.NODE_ENV !== "production") {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    // const resolve: Router['resolve'] = (rawLocation: RouteLocationRaw, currentLocation) => {
    // const objectLocation = routerLocationAsObject(rawLocation)
    // we create a copy to modify it later
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href = routerHistory.createHref(locationNormalized.fullPath);
      if (process.env.NODE_ENV !== "production") {
        if (href.startsWith("//")) warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      // locationNormalized is always a new object
      return assign(locationNormalized, matchedRoute, {
        params: decodeParams(matchedRoute.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: undefined,
        href,
      });
    }
    if (process.env.NODE_ENV !== "production" && !isRouteLocation(rawLocation)) {
      warn(`router.resolve() was passed an invalid location. This will fail in production.\n- Location:`, rawLocation);
      return resolve({});
    }
    let matcherLocation;
    // path could be relative in object as well
    if (rawLocation.path != null) {
      if (
        process.env.NODE_ENV !== "production" &&
        "params" in rawLocation &&
        !("name" in rawLocation) &&
        // @ts-expect-error: the type is never
        Object.keys(rawLocation.params).length
      ) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path,
      });
    } else {
      // remove any nullish param
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      // pass encoded values to the matcher, so it can produce encoded path and fullPath
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(targetParams),
      });
      // current location params are decoded, we need to encode them in case the
      // matcher merges the params
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (process.env.NODE_ENV !== "production" && hash && !hash.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    }
    // the matcher might have merged current location params, so
    // we need to run the decoding again
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(
      stringifyQuery$1,
      assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path,
      })
    );
    const href = routerHistory.createHref(fullPath);
    if (process.env.NODE_ENV !== "production") {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${rawLocation.path != null ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign(
      {
        fullPath,
        // keep the hash encoded so fullPath is effectively path + encodedQuery +
        // hash
        hash,
        query:
          // if the user is using a custom query lib like qs, we might have
          // nested objects, so we keep the query as is, meaning it can contain
          // numbers at `$route.query`, but at the point, the user will have to
          // use their own type anyway.
          // https://github.com/vuejs/router/issues/328#issuecomment-649481567
          stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {},
      },
      matchedRoute,
      {
        redirectedFrom: undefined,
        href,
      }
    );
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
        from,
        to,
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation =
          newTargetLocation.includes("?") || newTargetLocation.includes("#")
            ? (newTargetLocation = locationAsObject(newTargetLocation))
            : // force empty params
              { path: newTargetLocation };
        // @ts-expect-error: force empty params when a string is passed to let
        // the router parse them again
        newTargetLocation.params = {};
      }
      if (process.env.NODE_ENV !== "production" && newTargetLocation.path == null && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:\n${JSON.stringify(newTargetLocation, null, 2)}\n when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign(
        {
          query: to.query,
          hash: to.hash,
          // avoid transferring params if the redirect has a path
          params: newTargetLocation.path != null ? {} : to.params,
        },
        newTargetLocation
      );
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = (pendingLocation = resolve(to));
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    // to could be a string where `replace` is a function
    const replace = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace,
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    // if it was a redirect we already called `pushWithRedirect` above
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, { to: toLocation, from });
      // trigger scroll to allow scrolling to the same anchor
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
      .catch(error =>
        isNavigationFailure(error)
          ? // navigation redirects still mark the router as ready
            isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)
            ? error
            : markAsReady(error) // also returns the error
          : // reject any unknown error
            triggerError(error, toLocation, from)
      )
      .then(failure => {
        if (failure) {
          if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
            if (
              process.env.NODE_ENV !== "production" &&
              // we are redirecting to the same location we were already at
              isSameRouteLocation(stringifyQuery$1, resolve(failure.to), toLocation) &&
              // and we have done it a couple of times
              redirectedFrom &&
              // @ts-expect-error: added only in dev
              (redirectedFrom._count = redirectedFrom._count
                ? // @ts-expect-error
                  redirectedFrom._count + 1
                : 1) > 30
            ) {
              warn(
                `Detected a possibly infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow.\n Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`
              );
              return Promise.reject(new Error("Infinite redirect in navigation guard"));
            }
            return pushWithRedirect(
              // keep options
              assign(
                {
                  // preserve an existing replacement but allow the redirect to override it
                  replace,
                },
                locationAsObject(failure.to),
                {
                  state: typeof failure.to === "object" ? assign({}, data, failure.to.state) : data,
                  force,
                }
              ),
              // preserve the original redirectedFrom if any
              redirectedFrom || toLocation
            );
          }
        } else {
          // if we fail we don't finalize the navigation
          failure = finalizeNavigation(toLocation, from, true, replace, data);
        }
        triggerAfterEach(toLocation, from, failure);
        return failure;
      });
  }
  /**
   * Helper to reject and skip all navigation guards if a new navigation happened
   * @param to
   * @param from
   */
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    // support Vue < 3.3
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  // TODO: refactor the whole before guards by internally using router.beforeEach
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    // all components here have been resolved once because we are leaving
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    // leavingRecords is already reversed
    for (const record of leavingRecords) {
      record.leaveGuards.forEach(guard => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    // run the queue of per route beforeRouteLeave guards
    return (
      runGuardQueue(guards)
        .then(() => {
          // check global guards beforeEach
          guards = [];
          for (const guard of beforeGuards.list()) {
            guards.push(guardToPromiseFn(guard, to, from));
          }
          guards.push(canceledNavigationCheck);
          return runGuardQueue(guards);
        })
        .then(() => {
          // check in components beforeRouteUpdate
          guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
          for (const record of updatingRecords) {
            record.updateGuards.forEach(guard => {
              guards.push(guardToPromiseFn(guard, to, from));
            });
          }
          guards.push(canceledNavigationCheck);
          // run the queue of per route beforeEnter guards
          return runGuardQueue(guards);
        })
        .then(() => {
          // check the route beforeEnter
          guards = [];
          for (const record of enteringRecords) {
            // do not trigger beforeEnter on reused views
            if (record.beforeEnter) {
              if (isArray(record.beforeEnter)) {
                for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
              } else {
                guards.push(guardToPromiseFn(record.beforeEnter, to, from));
              }
            }
          }
          guards.push(canceledNavigationCheck);
          // run the queue of per route beforeEnter guards
          return runGuardQueue(guards);
        })
        .then(() => {
          // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
          // clear existing enterCallbacks, these are added by extractComponentsGuards
          to.matched.forEach(record => (record.enterCallbacks = {}));
          // check in-component beforeRouteEnter
          guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
          guards.push(canceledNavigationCheck);
          // run the queue of per route beforeEnter guards
          return runGuardQueue(guards);
        })
        .then(() => {
          // check global guards beforeResolve
          guards = [];
          for (const guard of beforeResolveGuards.list()) {
            guards.push(guardToPromiseFn(guard, to, from));
          }
          guards.push(canceledNavigationCheck);
          return runGuardQueue(guards);
        })
        // catch any navigation canceled
        .catch(err => (isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */) ? err : Promise.reject(err)))
    );
  }
  function triggerAfterEach(to, from, failure) {
    // navigation is confirmed, call afterGuards
    // TODO: wrap with error handlers
    afterGuards.list().forEach(guard => runWithContext(() => guard(to, from, failure)));
  }
  /**
   * - Cleans up any navigation guards
   * - Changes the url if necessary
   * - Calls the scrollBehavior
   */
  function finalizeNavigation(toLocation, from, isPush, replace, data) {
    // a more recent navigation took place
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    // only consider as push if it's not the first navigation
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    // change URL only if the user did a push/replace and if it's not the initial navigation because
    // it's just reflecting the url
    if (isPush) {
      // on the initial navigation, we want to reuse the scroll position from
      // history state if it exists
      if (replace || isFirstNavigation)
        routerHistory.replace(
          toLocation.fullPath,
          assign(
            {
              scroll: isFirstNavigation && state && state.scroll,
            },
            data
          )
        );
      else routerHistory.push(toLocation.fullPath, data);
    }
    // accept current navigation
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  // attach listener to history to trigger navigations
  function setupListeners() {
    // avoid setting up listeners twice due to an invalid first navigation
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      // cannot be a redirect route because it was in history
      const toLocation = resolve(to);
      // due to dynamic routing, and to hash history with manual navigation
      // (manually changing the url or calling history.hash = '#/somewhere'),
      // there could be a redirect record in history
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true, force: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      // TODO: should be moved to web history?
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from)
        .catch(error => {
          if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
            return error;
          }
          if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
            // Here we could call if (info.delta) routerHistory.go(-info.delta,
            // false) but this is bug prone as we have no way to wait the
            // navigation to be finished before calling pushWithRedirect. Using
            // a setTimeout of 16ms seems to work but there is no guarantee for
            // it to work on every browser. So instead we do not restore the
            // history entry and trigger a new navigation as requested by the
            // navigation guard.
            // the error is already handled by router.push we just want to avoid
            // logging the error
            pushWithRedirect(
              assign(locationAsObject(error.to), {
                force: true,
              }),
              toLocation
              // avoid an uncaught rejection, let push call triggerError
            )
              .then(failure => {
                // manual change in hash history #916 ending up in the URL not
                // changing, but it was changed by the manual url change, so we
                // need to manually change it ourselves
                if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */) && !info.delta && info.type === NavigationType.pop) {
                  routerHistory.go(-1, false);
                }
              })
              .catch(noop);
            // avoid the then branch
            return Promise.reject();
          }
          // do not restore history on unknown direction
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          }
          // unrecognized error, transfer to the global handler
          return triggerError(error, toLocation, from);
        })
        .then(failure => {
          failure =
            failure ||
            finalizeNavigation(
              // after navigation, all matched components are resolved
              toLocation,
              from,
              false
            );
          // revert the navigation
          if (failure) {
            if (
              info.delta &&
              // a new navigation has been triggered, so we do not want to revert, that will change the current history
              // entry while a different route is displayed
              !isNavigationFailure(failure, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)
            ) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
              // manual change in hash history #916
              // it's like a push but lacks the information of the direction
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        })
        // avoid warnings in the console about uncaught rejections, they are logged by triggerErrors
        .catch(noop);
    });
  }
  // Initialization and Errors
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  /**
   * Trigger errorListeners added via onError and throws the error as well
   *
   * @param error - error to throw
   * @param to - location we were navigating to when the error happened
   * @param from - location we were navigating from when the error happened
   * @returns the error as a rejected promise
   */
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) {
      list.forEach(handler => handler(error, to, from));
    } else {
      if (process.env.NODE_ENV !== "production") {
        warn("uncaught error during route navigation:");
      }
      console.error(error);
    }
    // reject the error no matter there were error listeners or not
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve, reject) => {
      readyHandlers.add([resolve, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      // still not ready if an error happened
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
      readyHandlers.reset();
    }
    return err;
  }
  // Scroll behavior
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = (!isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0))) || ((isFirstNavigation || !isPush) && history.state && history.state.scroll) || null;
    return nextTick()
      .then(() => scrollBehavior(to, from, scrollPosition))
      .then(position => position && scrollToPosition(position))
      .catch(err => triggerError(err, to, from));
  }
  const go = delta => routerHistory.go(delta);
  let started;
  const installedApps = new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute),
      });
      // this initial navigation is only necessary on client, on server it doesn't
      // make sense because it will create an extra unnecessary navigation and could
      // lead to problems
      if (
        isBrowser &&
        // used for the initial navigation client side to avoid pushing
        // multiple times when the router is used in multiple apps
        !started &&
        currentRoute.value === START_LOCATION_NORMALIZED
      ) {
        // see above
        started = true;
        push(routerHistory.location).catch(err => {
          if (process.env.NODE_ENV !== "production") warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true,
        });
      }
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function () {
        installedApps.delete(app);
        // the router is not attached to an app anymore
        if (installedApps.size < 1) {
          // invalidate the current navigation
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      // TODO: this probably needs to be updated so it can be used by vue-termui
      if ((process.env.NODE_ENV !== "production" || __VUE_PROD_DEVTOOLS__) && isBrowser) {
        addDevtools(app, router, matcher);
      }
    },
  };
  // TODO: type this as NavigationGuardReturn or similar instead of any
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
