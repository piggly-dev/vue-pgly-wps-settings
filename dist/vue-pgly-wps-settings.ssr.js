'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
const EMPTY_OBJ = {};
const NOOP = () => { };
const extend = Object.assign;
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === '[object Map]';
const isSet = (val) => toTypeString(val) === '[object Set]';
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isSymbol = (val) => typeof val === 'symbol';
const isObject = (val) => val !== null && typeof val === 'object';
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
// compare whether a value has changed, accounting for NaN.
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
    });
};let activeEffectScope;
function recordEffectScope(effect, scope) {
    scope = scope || activeEffectScope;
    if (scope && scope.active) {
        scope.effects.push(effect);
    }
}
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].w |= trackOpBit; // set was tracked
        }
    }
};
const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
        let ptr = 0;
        for (let i = 0; i < deps.length; i++) {
            const dep = deps[i];
            if (wasTracked(dep) && !newTracked(dep)) {
                dep.delete(effect);
            }
            else {
                deps[ptr++] = dep;
            }
            // clear bits
            dep.w &= ~trackOpBit;
            dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
    }
};
// The number of effects currently being tracked recursively.
let effectTrackDepth = 0;
let trackOpBit = 1;
/**
 * The bitwise track markers support at most 30 levels op recursion.
 * This value is chosen to enable modern JS engines to use a SMI on all platforms.
 * When recursion depth is greater, fall back to using a full cleanup.
 */
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
        this.fn = fn;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        recordEffectScope(this, scope);
    }
    run() {
        if (!this.active) {
            return this.fn();
        }
        if (!effectStack.includes(this)) {
            try {
                effectStack.push((activeEffect = this));
                enableTracking();
                trackOpBit = 1 << ++effectTrackDepth;
                if (effectTrackDepth <= maxMarkerBits) {
                    initDepMarkers(this);
                }
                else {
                    cleanupEffect(this);
                }
                return this.fn();
            }
            finally {
                if (effectTrackDepth <= maxMarkerBits) {
                    finalizeDepMarkers(this);
                }
                trackOpBit = 1 << --effectTrackDepth;
                resetTracking();
                effectStack.pop();
                const n = effectStack.length;
                activeEffect = n > 0 ? effectStack[n - 1] : undefined;
            }
        }
    }
    stop() {
        if (this.active) {
            cleanupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            this.active = false;
        }
    }
}
function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effect);
        }
        deps.length = 0;
    }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
}
new Set(Object.getOwnPropertyNames(Symbol)
    .map(key => Symbol[key])
    .filter(isSymbol));
function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw" /* RAW */]);
    }
    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
}
function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
}
function toRaw(observed) {
    const raw = observed && observed["__v_raw" /* RAW */];
    return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
    def(value, "__v_skip" /* SKIP */, true);
    return value;
}
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
function unref(ref) {
    return isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
        }
        else {
            return Reflect.set(target, key, value, receiver);
        }
    }
};
function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs)
        ? objectWithRefs
        : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
Promise.resolve();function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
        if (isArray(fn)) {
            suspense.effects.push(...fn);
        }
        else {
            suspense.effects.push(fn);
        }
    }
    else {
        queuePostFlushCb(fn);
    }
}

// implementation, close to no-op
function defineComponent(options) {
    return isFunction(options) ? { setup: options, name: options.name } : options;
}
/**
 * Resolve merged options and cache it on the component.
 * This is done only once per-component since the merging does not involve
 * instances.
 */
function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
        resolved = cached;
    }
    else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
            resolved = base;
        }
    }
    else {
        resolved = {};
        if (globalMixins.length) {
            globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
        }
        mergeOptions(resolved, base, optionMergeStrategies);
    }
    cache.set(base, resolved);
    return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
        mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
        if (asMixin && key === 'expose') ;
        else {
            const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
            to[key] = strat ? strat(to[key], from[key]) : from[key];
        }
    }
    return to;
}
const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    destroyed: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
};
function mergeDataFn(to, from) {
    if (!from) {
        return to;
    }
    if (!to) {
        return from;
    }
    return function mergedDataFn() {
        return (extend)(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
}
function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
    if (isArray(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) {
            res[raw[i]] = raw[i];
        }
        return res;
    }
    return raw;
}
function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
    return to ? extend(extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
    if (!to)
        return from;
    if (!from)
        return to;
    const merged = extend(Object.create(null), to);
    for (const key in from) {
        merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
}

const queuePostRenderEffect = queueEffectWithSuspense
    ;

/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */
const getPublicInstance = (i) => {
    if (!i)
        return null;
    if (isStatefulComponent(i))
        return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
    $: i => i,
    $el: i => i.vnode.el,
    $data: i => i.data,
    $props: i => (i.props),
    $attrs: i => (i.attrs),
    $slots: i => (i.slots),
    $refs: i => (i.refs),
    $parent: i => getPublicInstance(i.parent),
    $root: i => getPublicInstance(i.root),
    $emit: i => i.emit,
    $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
    $forceUpdate: i => () => queueJob(i.update),
    $nextTick: i => nextTick.bind(i.proxy),
    $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
});
let currentInstance = null;
const setCurrentInstance = (instance) => {
    currentInstance = instance;
    instance.scope.on();
};
const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
};
function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
}
function getExposeProxy(instance) {
    if (instance.exposed) {
        return (instance.exposeProxy ||
            (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                get(target, key) {
                    if (key in target) {
                        return target[key];
                    }
                    else if (key in publicPropertiesMap) {
                        return publicPropertiesMap[key](instance);
                    }
                }
            })));
    }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
function getComponentName(Component) {
    return isFunction(Component)
        ? Component.displayName || Component.name
        : Component.name;
}
/* istanbul ignore next */
function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
            name = match[1];
        }
    }
    if (!name && instance && instance.parent) {
        // try to infer the name based on reverse resolution
        const inferFromRegistry = (registry) => {
            for (const key in registry) {
                if (registry[key] === Component) {
                    return key;
                }
            }
        };
        name =
            inferFromRegistry(instance.components ||
                instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}

const stack = [];
function warn(msg, ...args) {
    // avoid props formatting or warn handler tracking deps that might be mutated
    // during patch, leading to infinite recursion.
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
            msg + args.join(''),
            instance && instance.proxy,
            trace
                .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                .join('\n'),
            trace
        ]);
    }
    else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        /* istanbul ignore if */
        if (trace.length &&
            // avoid spamming console during tests
            !false) {
            warnArgs.push(`\n`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
    }
    resetTracking();
}
function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
        return [];
    }
    // we can't just use the stack because it will be incomplete during updates
    // that did not start from the root. Re-construct the parent chain using
    // instance parent pointers.
    const normalizedStack = [];
    while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
            last.recurseCount++;
        }
        else {
            normalizedStack.push({
                vnode: currentVNode,
                recurseCount: 0
            });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
}
/* istanbul ignore next */
function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
        logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
    });
    return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props
        ? [open, ...formatProps(vnode.props), close]
        : [open + close];
}
/* istanbul ignore next */
function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach(key => {
        res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
        res.push(` ...`);
    }
    return res;
}
/* istanbul ignore next */
function formatProp(key, value, raw) {
    if (isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key}=${value}`];
    }
    else if (typeof value === 'number' ||
        typeof value === 'boolean' ||
        value == null) {
        return raw ? value : [`${key}=${value}`];
    }
    else if (isRef(value)) {
        value = formatProp(key, toRaw(value.value), true);
        return raw ? value : [`${key}=Ref<`, value, `>`];
    }
    else if (isFunction(value)) {
        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    }
    else {
        value = toRaw(value);
        return raw ? value : [`${key}=`, value];
    }
}
function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
        res = args ? fn(...args) : fn();
    }
    catch (err) {
        handleError(err, instance, type);
    }
    return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && isPromise(res)) {
            res.catch(err => {
                handleError(err, instance, type);
            });
        }
        return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
}
function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
        let cur = instance.parent;
        // the exposed instance is the render proxy to keep it consistent with 2.x
        const exposedInstance = instance.proxy;
        // in production the hook receives only the error code
        const errorInfo = type;
        while (cur) {
            const errorCapturedHooks = cur.ec;
            if (errorCapturedHooks) {
                for (let i = 0; i < errorCapturedHooks.length; i++) {
                    if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                        return;
                    }
                }
            }
            cur = cur.parent;
        }
        // app-level handling
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
            callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
            return;
        }
    }
    logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
    {
        // recover in prod to reduce the impact on end-user
        console.error(err);
    }
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
    const p = currentFlushPromise || resolvedPromise;
    return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
// #2768
// Use binary-search to find a suitable position in the queue,
// so that the queue maintains the increasing order of job's id,
// which can prevent the job from being skipped and also can avoid repeated patching.
function findInsertionIndex(id) {
    // the start index should be `flushIndex + 1`
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
        const middle = (start + end) >>> 1;
        const middleJobId = getId(queue[middle]);
        middleJobId < id ? (start = middle + 1) : (end = middle);
    }
    return start;
}
function queueJob(job) {
    // the dedupe search uses the startIndex argument of Array.includes()
    // by default the search index includes the current job that is being run
    // so it cannot recursively trigger itself again.
    // if the job is a watch() callback, the search will start with a +1 index to
    // allow it recursively trigger itself - it is the user's responsibility to
    // ensure it doesn't end up in an infinite loop.
    if ((!queue.length ||
        !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
        job !== currentPreFlushParentJob) {
        if (job.id == null) {
            queue.push(job);
        }
        else {
            queue.splice(findInsertionIndex(job.id), 0, job);
        }
        queueFlush();
    }
}
function queueFlush() {
    if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
    }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
    if (!isArray(cb)) {
        if (!activeQueue ||
            !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
            pendingQueue.push(cb);
        }
    }
    else {
        // if cb is an array, it is a component lifecycle hook which can only be
        // triggered by a job, which is already deduped in the main queue, so
        // we can skip duplicate check here to improve perf
        pendingQueue.push(...cb);
    }
    queueFlush();
}
function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
        currentPreFlushParentJob = parentJob;
        activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
        pendingPreFlushCbs.length = 0;
        for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
            activePreFlushCbs[preFlushIndex]();
        }
        activePreFlushCbs = null;
        preFlushIndex = 0;
        currentPreFlushParentJob = null;
        // recursively flush until it drains
        flushPreFlushCbs(seen, parentJob);
    }
}
function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        // #1947 already has active queue, nested flushPostFlushCbs call
        if (activePostFlushCbs) {
            activePostFlushCbs.push(...deduped);
            return;
        }
        activePostFlushCbs = deduped;
        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    flushPreFlushCbs(seen);
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child so its render effect will have smaller
    //    priority number)
    // 2. If a component is unmounted during a parent component's update,
    //    its update can be skipped.
    queue.sort((a, b) => getId(a) - getId(b));
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            if (job && job.active !== false) {
                if (("production" !== 'production') && checkRecursiveUpdates(seen, job)) ;
                // console.log(`running:`, job.id)
                callWithErrorHandling(job, null, 14 /* SCHEDULER */);
            }
        }
    }
    finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs();
        isFlushing = false;
        currentFlushPromise = null;
        // some postFlushCb queued jobs!
        // keep flushing until it drains.
        if (queue.length ||
            pendingPreFlushCbs.length ||
            pendingPostFlushCbs.length) {
            flushJobs(seen);
        }
    }
}
function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
        seen.set(fn, 1);
    }
    else {
        const count = seen.get(fn);
        if (count > RECURSION_LIMIT) {
            const instance = fn.ownerInstance;
            const componentName = instance && getComponentName(instance.type);
            warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` +
                `This means you have a reactive effect that is mutating its own ` +
                `dependencies and thus recursively triggering itself. Possible sources ` +
                `include component template, render function, updated hook or ` +
                `watcher source function.`);
            return true;
        }
        else {
            seen.set(fn, count + 1);
        }
    }
}
// initial value for watchers to trigger on undefined initial values
const INITIAL_WATCHER_VALUE = {};
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
    const instance = currentInstance;
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = !!source._shallow;
    }
    else if (isReactive(source)) {
        getter = () => source;
        deep = true;
    }
    else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some(isReactive);
        getter = () => source.map(s => {
            if (isRef(s)) {
                return s.value;
            }
            else if (isReactive(s)) {
                return traverse(s);
            }
            else if (isFunction(s)) {
                return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
            }
            else ;
        });
    }
    else if (isFunction(source)) {
        if (cb) {
            // getter with cb
            getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
        }
        else {
            // no cb -> simple effect
            getter = () => {
                if (instance && instance.isUnmounted) {
                    return;
                }
                if (cleanup) {
                    cleanup();
                }
                return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
            };
        }
    }
    else {
        getter = NOOP;
    }
    if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onInvalidate = (fn) => {
        cleanup = effect.onStop = () => {
            callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
        };
    };
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
        if (!effect.active) {
            return;
        }
        if (cb) {
            // watch(source, cb)
            const newValue = effect.run();
            if (deep ||
                forceTrigger ||
                (isMultiSource
                    ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                    : hasChanged(newValue, oldValue)) ||
                (false  )) {
                // cleanup before running cb again
                if (cleanup) {
                    cleanup();
                }
                callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                    onInvalidate
                ]);
                oldValue = newValue;
            }
        }
        else {
            // watchEffect
            effect.run();
        }
    };
    // important: mark the job as a watcher callback so that scheduler knows
    // it is allowed to self-trigger (#1727)
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === 'sync') {
        scheduler = job; // the scheduler function gets called directly
    }
    else if (flush === 'post') {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    }
    else {
        // default: 'pre'
        scheduler = () => {
            if (!instance || instance.isMounted) {
                queuePreFlushCb(job);
            }
            else {
                // with 'pre' option, the first call must happen before
                // the component is mounted so it is called synchronously.
                job();
            }
        };
    }
    const effect = new ReactiveEffect(getter, scheduler);
    // initial run
    if (cb) {
        if (immediate) {
            job();
        }
        else {
            oldValue = effect.run();
        }
    }
    else if (flush === 'post') {
        queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    }
    else {
        effect.run();
    }
    return () => {
        effect.stop();
        if (instance && instance.scope) {
            remove(instance.scope.effects, effect);
        }
    };
}
// this.$watch
function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source)
        ? source.includes('.')
            ? createPathGetter(publicThis, source)
            : () => publicThis[source]
        : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
        cb = value;
    }
    else {
        cb = value.handler;
        options = value;
    }
    const cur = currentInstance;
    setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
        setCurrentInstance(cur);
    }
    else {
        unsetCurrentInstance();
    }
    return res;
}
function createPathGetter(ctx, path) {
    const segments = path.split('.');
    return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
            cur = cur[segments[i]];
        }
        return cur;
    };
}
function traverse(value, seen = new Set()) {
    if (!isObject(value) || value["__v_skip" /* SKIP */]) {
        return value;
    }
    seen = seen || new Set();
    if (seen.has(value)) {
        return value;
    }
    seen.add(value);
    if (isRef(value)) {
        traverse(value.value, seen);
    }
    else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    }
    else if (isSet(value) || isMap(value)) {
        value.forEach((v) => {
            traverse(v, seen);
        });
    }
    else if (isPlainObject(value)) {
        for (const key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}var colors = ['regular', 'transparent', 'dark', 'primary', 'link', 'info', 'success', 'warning', 'danger', 'accent', 'white', 'black'];
var sizes = ['normal', 'medium', 'large'];
var buttonTypes = ['regular', 'compact', 'expanded'];var script$i = defineComponent({
  name: 'PglyBadge',
  props: {
    color: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator: function validator(value) {
        return sizes.indexOf(value) !== -1;
      }
    },
    close: {
      type: Function,
      default: undefined
    },
    light: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose: function onClose() {
      if (this.close) {
        this.close();
        return;
      }
    }
  }
});function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--badge', "pgly-wps-is-".concat(_ctx.color), "pgly-wps-is-".concat(_ctx.size), {
      'pgly-wps-is-light': _ctx.light
    }, {
      'pgly-wps-is-rounded': _ctx.rounded
    }])
  }, [vue.renderSlot(_ctx.$slots, "default"), _ctx.close ? (vue.openBlock(), vue.createElementBlock("button", {
    key: 0,
    class: "pgly-wps--delete",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClose && _ctx.onClose.apply(_ctx, arguments);
    })
  })) : vue.createCommentVNode("", true)], 2);
}script$i.render = render$i;var script$h = defineComponent({
  name: 'PglyBadges',
  components: {
    PglyBadge: script$i
  },
  props: {
    addons: {
      type: Boolean,
      default: false
    },
    badges: {
      type: Array,
      default: []
    },
    position: {
      type: String,
      default: 'left',
      validator: function validator(value) {
        return ['left', 'centered', 'right'].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator: function validator(value) {
        return sizes.indexOf(value) !== -1;
      }
    }
  },
  methods: {
    onClose: function onClose(id) {
      this.$emit('badgeClose', id);
    }
  }
});function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_pgly_badge = vue.resolveComponent("pgly-badge");

  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--badges', "pgly-wps-are-".concat(_ctx.size), "pgly-wps-is-".concat(_ctx.position), {
      'pgly-wps-has-addons': _ctx.addons
    }])
  }, [vue.createVNode(vue.TransitionGroup, {
    name: "pgly-wps--badge",
    tag: "div"
  }, {
    default: vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.badges, function (b) {
        return vue.openBlock(), vue.createBlock(_component_pgly_badge, {
          key: b.id,
          color: b.color,
          size: b.size,
          light: b.light,
          rounded: b.rounded,
          close: b.id !== undefined ? function () {
            return _ctx.onClose(b.id);
          } : undefined
        }, {
          default: vue.withCtx(function () {
            return [vue.createTextVNode(vue.toDisplayString(b.body), 1)];
          }),
          _: 2
        }, 1032, ["color", "size", "light", "rounded", "close"]);
      }), 128))];
    }),
    _: 1
  })], 2);
}script$h.render = render$h;var script$g = defineComponent({
  name: 'PglyNavigator',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    items: {
      type: Array,
      default: []
    },
    size: {
      type: String,
      default: 'normal',
      validator: function validator(value) {
        return sizes.indexOf(value) !== -1;
      }
    }
  },
  methods: {
    onClick: function onClick(key) {
      this.$emit('update:modelValue', key);
    }
  }
});var _hoisted_1$c = ["href", "onClick"];
function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("nav", {
    class: vue.normalizeClass(['pgly-wps--navigator', "pgly-wps-are-".concat(_ctx.size)])
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.items, function (i) {
    return vue.openBlock(), vue.createElementBlock("a", {
      key: i.key,
      href: i.link ? i.link : '#',
      onClick: function onClick() {
        if (i.link !== undefined) {
          return;
        }

        _ctx.onClick(i.key);
      },
      class: vue.normalizeClass(['pgly-wps--item', {
        'pgly-wps-is-selected': _ctx.modelValue === i.key
      }])
    }, vue.toDisplayString(i.label), 11, _hoisted_1$c);
  }), 128))], 2);
}script$g.render = render$g;var script$f = defineComponent({
  name: 'PglyNotification',
  mounted: function mounted() {
    var _this = this;

    if (this.timer > 0) {
      setTimeout(function () {
        _this.onClose();
      }, this.timer);
    }
  },
  props: {
    color: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    close: {
      type: Function,
      default: undefined
    },
    timer: {
      type: Number,
      default: 0
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose: function onClose() {
      if (this.close) {
        this.close();
        return;
      }
    }
  }
});function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--notification', "pgly-wps-is-".concat(_ctx.color), {
      'pgly-wps-is-light': _ctx.light
    }])
  }, [_ctx.close ? (vue.openBlock(), vue.createElementBlock("button", {
    key: 0,
    class: "pgly-wps--delete",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClose && _ctx.onClose.apply(_ctx, arguments);
    })
  })) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "default")], 2);
}script$f.render = render$f;var script$e = defineComponent({
  name: 'PglyNotifications',
  components: {
    PglyNotification: script$f
  },
  props: {
    notifications: {
      type: Array,
      default: []
    }
  },
  methods: {
    onClose: function onClose(id) {
      this.$emit('notificationClose', id);
    }
  }
});var _hoisted_1$b = {
  class: "pgly-wps--notifications"
};
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_pgly_notification = vue.resolveComponent("pgly-notification");

  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$b, [vue.createVNode(vue.TransitionGroup, {
    name: "pgly-wps--notification",
    tag: "div"
  }, {
    default: vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.notifications, function (n) {
        return vue.openBlock(), vue.createBlock(_component_pgly_notification, {
          key: n.id,
          color: n.color,
          timer: n.timer,
          light: n.light,
          close: n.id !== undefined ? function () {
            return _ctx.onClose(n.id);
          } : undefined
        }, {
          default: vue.withCtx(function () {
            return [vue.createTextVNode(vue.toDisplayString(n.body), 1)];
          }),
          _: 2
        }, 1032, ["color", "timer", "light", "close"]);
      }), 128))];
    }),
    _: 1
  })]);
}script$e.render = render$e;var script$d = defineComponent({
  name: 'PglyToast',
  mounted: function mounted() {
    var _this = this;

    if (this.timer > 0) {
      setTimeout(function () {
        _this.onClose();
      }, this.timer);
    }
  },
  props: {
    color: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    close: {
      type: Function,
      default: undefined
    },
    timer: {
      type: Number,
      default: 0
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose: function onClose() {
      if (this.close) {
        this.close();
        return;
      }
    }
  }
});function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--toast', "pgly-wps-is-".concat(_ctx.color), {
      'pgly-wps-is-light': _ctx.light
    }])
  }, [_ctx.close ? (vue.openBlock(), vue.createElementBlock("button", {
    key: 0,
    class: "pgly-wps--delete",
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClose && _ctx.onClose.apply(_ctx, arguments);
    })
  })) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "default")], 2);
}script$d.render = render$d;var script$c = defineComponent({
  name: 'PglyToaster',
  components: {
    PglyToast: script$d
  },
  props: {
    position: {
      type: String,
      validator: function validator(val) {
        return /^(:?n|s|nw|ne|sw|se)$/.test(val);
      },
      default: 'se'
    },
    toasts: {
      type: Array,
      default: []
    }
  },
  methods: {
    onClose: function onClose(id) {
      this.$emit('toastClose', id);
    }
  }
});function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_pgly_toast = vue.resolveComponent("pgly-toast");

  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--toaster', "pgly-wps-in-".concat(_ctx.position)])
  }, [vue.createVNode(vue.TransitionGroup, {
    name: "pgly-wps--toast",
    tag: "div"
  }, {
    default: vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.toasts, function (t) {
        return vue.openBlock(), vue.createBlock(_component_pgly_toast, {
          key: t.id,
          color: t.color,
          timer: t.timer,
          light: t.light,
          close: t.id !== undefined ? function () {
            return _ctx.onClose(t.id);
          } : undefined
        }, {
          default: vue.withCtx(function () {
            return [vue.createTextVNode(vue.toDisplayString(t.body), 1)];
          }),
          _: 2
        }, 1032, ["color", "timer", "light", "close"]);
      }), 128))];
    }),
    _: 1
  })], 2);
}script$c.render = render$c;var script$b = vue.defineComponent({
  name: 'PglySpinner',
  props: {
    color: {
      type: String,
      default: 'white',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    centered: {
      type: Boolean,
      default: false
    }
  }
});var _hoisted_1$a = /*#__PURE__*/vue.createElementVNode("circle", {
  class: "path",
  cx: "25",
  cy: "25",
  r: "20",
  fill: "none",
  "stroke-width": "5"
}, null, -1);

var _hoisted_2$4 = [_hoisted_1$a];
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("svg", {
    class: vue.normalizeClass(['pgly-wps--spinner', "pgly-wps-is-".concat(_ctx.color), {
      'pgly-wps-is-absolute': _ctx.centered
    }]),
    viewBox: "0 0 50 50"
  }, _hoisted_2$4, 2);
}script$b.render = render$b;var EColors;

(function (EColors) {
  EColors["REGULAR"] = "regular";
  EColors["TRANSPARENT"] = "transparent";
  EColors["DARK"] = "dark";
  EColors["PRIMARY"] = "primary";
  EColors["LINK"] = "link";
  EColors["INFO"] = "info";
  EColors["SUCCESS"] = "success";
  EColors["WARNING"] = "warning";
  EColors["DANGER"] = "danger";
  EColors["ACCENT"] = "accent";
  EColors["WHITE"] = "white";
  EColors["BLACK"] = "black";
})(EColors || (EColors = {}));
var ESizes;

(function (ESizes) {
  ESizes["NORMAL"] = "normal";
  ESizes["MEDIUM"] = "medium";
  ESizes["LARGE"] = "large";
})(ESizes || (ESizes = {}));
var EButtonTypes;

(function (EButtonTypes) {
  EButtonTypes["REGULAR"] = "regular";
  EButtonTypes["COMPACT"] = "compact";
  EButtonTypes["EXPANDED"] = "expanded";
})(EButtonTypes || (EButtonTypes = {}));var script$a = defineComponent({
  name: 'PglyAsyncButton',
  components: {
    PglySpinner: script$b
  },
  data: function data() {
    return {
      running: false,
      spinnerColor: 'white'
    };
  },
  props: {
    action: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      default: 'primary',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return buttonTypes.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--button', 'pgly-async--behaviour', "pgly-wps-is-".concat(this.type)];

      if (this.disabled) {
        classes.push('pgly-wps-is-disabled');
      } else {
        classes.push("pgly-wps-is-".concat(this.color));
      }

      if (this.type === EButtonTypes.COMPACT) {
        this.spinnerColor = this.color;
      }

      if (this.running) {
        classes.push('pgly-loading--state');
      }

      return classes.join(' ');
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled || this.running) return;
      this.run();
    },
    run: function run() {
      var _this = this;

      this.running = true;
      this.action().then(function (res) {
        _this.$emit('buttonLoaded', res);
      }).catch(function (err) {
        _this.$emit('buttonError', err);
      }).finally(function () {
        _this.running = false;
      });
    }
  }
});var _hoisted_1$9 = ["disabled"];
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_pgly_spinner = vue.resolveComponent("pgly-spinner");

  return vue.openBlock(), vue.createElementBlock("button", {
    class: vue.normalizeClass(_ctx.mountClasses),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClick && _ctx.onClick.apply(_ctx, arguments);
    })
  }, [vue.createTextVNode(vue.toDisplayString(_ctx.label) + " ", 1), _ctx.running ? (vue.openBlock(), vue.createBlock(_component_pgly_spinner, {
    key: 0,
    color: _ctx.spinnerColor
  }, null, 8, ["color"])) : vue.createCommentVNode("", true)], 10, _hoisted_1$9);
}script$a.render = render$a;var script$9 = defineComponent({
  name: 'PglyAsyncIconButton',
  components: {
    PglySpinner: script$b
  },
  data: function data() {
    return {
      running: false,
      spinnerColor: 'white'
    };
  },
  props: {
    action: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      default: 'primary',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return sizes.indexOf(value) !== -1;
      }
    },
    compact: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--button', 'pgly-async--behaviour', "pgly-wps-is-".concat(this.size)];

      if (this.disabled) {
        classes.push('pgly-wps-is-disabled');
      } else {
        classes.push("pgly-wps-is-".concat(this.color));
      }

      if (this.compact) {
        this.spinnerColor = this.color;
        classes.push("pgly-wps-is-compact");
      }

      if (this.rounded) {
        classes.push("pgly-wps-is-rounded");
      }

      if (this.running) {
        classes.push('pgly-loading--state');
      }

      return classes.join(' ');
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled || this.running) return;
      this.run();
    },
    run: function run() {
      var _this = this;

      this.running = true;
      this.action().then(function (res) {
        _this.$emit('buttonLoaded', res);
      }).catch(function (err) {
        _this.$emit('buttonError', err);
      }).finally(function () {
        _this.running = false;
      });
    }
  }
});var _hoisted_1$8 = ["disabled"];
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_pgly_spinner = vue.resolveComponent("pgly-spinner");

  return vue.openBlock(), vue.createElementBlock("button", {
    class: vue.normalizeClass(_ctx.mountClasses),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClick && _ctx.onClick.apply(_ctx, arguments);
    })
  }, [vue.renderSlot(_ctx.$slots, "default"), _ctx.running ? (vue.openBlock(), vue.createBlock(_component_pgly_spinner, {
    key: 0,
    color: _ctx.spinnerColor
  }, null, 8, ["color"])) : vue.createCommentVNode("", true)], 10, _hoisted_1$8);
}script$9.render = render$9;var script$8 = vue.defineComponent({
  name: 'PglyExplorer',
  components: {
    PglySpinner: script$b
  },
  data: function data() {
    return {
      spinnerColor: 'white'
    };
  },
  mounted: function mounted() {
    if (this.light) {
      this.spinnerColor = this.color;
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    label: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: undefined
    },
    compact: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    }
  }
});var _hoisted_1$7 = {
  key: 1,
  class: "pgly-wps--tooltip"
};

var _hoisted_2$3 = /*#__PURE__*/vue.createElementVNode("svg", {
  class: "pgly-wps--info",
  baseProfile: "tiny",
  version: "1.2",
  viewBox: "0 0 24 24",
  "xml:space": "preserve",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/vue.createElementVNode("path", {
  d: "m13.839 17.525c-6e-3 2e-3 -0.559 0.186-1.039 0.186-0.265 0-0.372-0.055-0.406-0.079-0.168-0.117-0.48-0.336 0.054-1.4l1-1.994c0.593-1.184 0.681-2.329 0.245-3.225-0.356-0.733-1.039-1.236-1.92-1.416-0.317-0.065-0.639-0.097-0.958-0.097-1.849 0-3.094 1.08-3.146 1.126-0.179 0.158-0.221 0.42-0.102 0.626 0.12 0.206 0.367 0.3 0.595 0.222 5e-3 -2e-3 0.559-0.187 1.039-0.187 0.263 0 0.369 0.055 0.402 0.078 0.169 0.118 0.482 0.34-0.051 1.402l-1 1.995c-0.594 1.185-0.681 2.33-0.245 3.225 0.356 0.733 1.038 1.236 1.921 1.416 0.314 0.063 0.636 0.097 0.954 0.097 1.85 0 3.096-1.08 3.148-1.126 0.179-0.157 0.221-0.42 0.102-0.626-0.12-0.205-0.369-0.297-0.593-0.223z"
}), /*#__PURE__*/vue.createElementVNode("circle", {
  cx: "13",
  cy: "6.001",
  r: "2.5"
})], -1);

var _hoisted_3$3 = {
  class: "pgly-wps--data"
};
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_pgly_spinner = vue.resolveComponent("pgly-spinner");

  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--explorer', "pgly-wps-is-".concat(_ctx.color), {
      'pgly-wps-is-light': _ctx.light
    }, {
      'pgly-wps-is-compact': _ctx.compact
    }, {
      'pgly-loading--state': _ctx.loading
    }])
  }, [_ctx.loading ? (vue.openBlock(), vue.createBlock(_component_pgly_spinner, {
    key: 0,
    color: _ctx.spinnerColor
  }, null, 8, ["color"])) : vue.createCommentVNode("", true), _ctx.tooltip ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$7, [_hoisted_2$3, vue.createElementVNode("div", _hoisted_3$3, vue.toDisplayString(_ctx.tooltip), 1)])) : vue.createCommentVNode("", true), vue.createElementVNode("strong", null, vue.toDisplayString(_ctx.label), 1), vue.createElementVNode("span", null, vue.toDisplayString(_ctx.value), 1)], 2);
}script$8.render = render$8;var script$7 = defineComponent({
  name: 'PglyLinkButton',
  props: {
    link: {
      type: String,
      required: true
    },
    target: {
      type: String,
      default: '_blank'
    },
    color: {
      type: String,
      default: 'primary',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return buttonTypes.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--button', "pgly-wps-is-".concat(this.type)];

      if (this.disabled) {
        classes.push('pgly-wps-is-disabled');
      } else {
        classes.push("pgly-wps-is-".concat(this.color));
      }

      return classes.join(' ');
    }
  }
});var _hoisted_1$6 = ["disabled", "href", "target"];
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("a", {
    class: vue.normalizeClass(_ctx.mountClasses),
    disabled: _ctx.disabled,
    href: _ctx.link,
    target: _ctx.target
  }, vue.toDisplayString(_ctx.label), 11, _hoisted_1$6);
}script$7.render = render$7;var script$6 = defineComponent({
  name: 'PglySyncButton',
  data: function data() {
    return {
      running: false
    };
  },
  props: {
    action: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      default: 'primary',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return buttonTypes.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--button', "pgly-wps-is-".concat(this.type)];

      if (this.disabled) {
        classes.push('pgly-wps-is-disabled');
      } else {
        classes.push("pgly-wps-is-".concat(this.color));
      }

      return classes.join(' ');
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled || this.running) return;
      this.run();
    },
    run: function run() {
      this.running = true;

      try {
        this.action();
      } catch (err) {
        this.$emit('buttonError', err);
      }

      this.running = false;
    }
  }
});var _hoisted_1$5 = ["disabled"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("button", {
    class: vue.normalizeClass(_ctx.mountClasses),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClick && _ctx.onClick.apply(_ctx, arguments);
    })
  }, vue.toDisplayString(_ctx.label), 11, _hoisted_1$5);
}script$6.render = render$6;var script$5 = defineComponent({
  name: 'PglySyncIconButton',
  data: function data() {
    return {
      running: false
    };
  },
  props: {
    action: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      default: 'primary',
      validator: function validator(value) {
        return colors.indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'regular',
      validator: function validator(value) {
        return sizes.indexOf(value) !== -1;
      }
    },
    compact: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--icon-button', "pgly-wps-is-".concat(this.size)];

      if (this.disabled) {
        classes.push('pgly-wps-is-disabled');
      } else {
        classes.push("pgly-wps-is-".concat(this.color));
      }

      if (this.rounded) {
        classes.push("pgly-wps-is-rounded");
      }

      if (this.compact) {
        classes.push("pgly-wps-is-compact");
      }

      return classes.join(' ');
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled || this.running) return;
      this.run();
    },
    run: function run() {
      this.running = true;

      try {
        this.action();
      } catch (err) {
        this.$emit('buttonError', err);
      }

      this.running = false;
    }
  }
});var _hoisted_1$4 = ["disabled"];
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("button", {
    class: vue.normalizeClass(_ctx.mountClasses),
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onClick && _ctx.onClick.apply(_ctx, arguments);
    })
  }, [vue.renderSlot(_ctx.$slots, "default")], 10, _hoisted_1$4);
}script$5.render = render$5;var script$4 = defineComponent({
  name: 'PglyBasicCheckbox',
  emits: ['update:modelValue', 'afterChange'],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object,
      default: {
        state: false
      }
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--field'];

      if (this.error.state) {
        classes.push('pgly-wps--error');
      }

      return classes.join(' ');
    },
    mountCheckboxClasses: function mountCheckboxClasses() {
      var classes = ['pgly-wps--checkbox'];

      if (this.disabled) {
        classes.push('pgly-disabled--state');
      }

      if (this.modelValue) {
        classes.push('pgly-checked--state');
      }

      return classes.join(' ');
    },
    hasDescription: function hasDescription() {
      return !!this.$slots.description;
    }
  },
  methods: {
    onChanged: function onChanged(checked) {
      if (this.disabled) return;
      this.$emit('update:modelValue', checked);
      this.$emit('afterChange', checked);
    }
  }
});var _hoisted_1$3 = ["for"];
var _hoisted_2$2 = ["tabindex"];

var _hoisted_3$2 = /*#__PURE__*/vue.createElementVNode("div", {
  class: "pgly-wps--icon"
}, null, -1);

var _hoisted_4$2 = {
  class: "pgly-wps--placeholder"
};
var _hoisted_5$2 = {
  key: 0,
  class: "pgly-wps--message"
};
var _hoisted_6$1 = {
  key: 1,
  class: "pgly-wps--description"
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.mountClasses)
  }, [vue.createElementVNode("label", {
    class: vue.normalizeClass(['pgly-wps--label', {
      hidden: !_ctx.label
    }]),
    for: _ctx.id
  }, vue.toDisplayString(_ctx.label), 11, _hoisted_1$3), vue.createElementVNode("div", {
    tabindex: _ctx.tabindex,
    class: vue.normalizeClass(_ctx.mountCheckboxClasses),
    onClick: _cache[0] || (_cache[0] = function (e) {
      return _ctx.onChanged(!_ctx.modelValue);
    })
  }, [_hoisted_3$2, vue.createElementVNode("div", _hoisted_4$2, vue.toDisplayString(_ctx.placeholder), 1)], 10, _hoisted_2$2), _ctx.error.message ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$2, vue.toDisplayString(_ctx.error.message), 1)) : vue.createCommentVNode("", true), _ctx.hasDescription ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_6$1, [vue.renderSlot(_ctx.$slots, "description")])) : vue.createCommentVNode("", true)], 2);
}script$4.render = render$4;var script$3 = defineComponent({
  name: 'PglyBasicInput',
  emits: ['update:modelValue', 'afterChange'],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    tabindex: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: undefined
    },
    tag: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object,
      default: {
        state: false
      }
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--field'];

      if (this.error.state) {
        classes.push('pgly-wps--error');
      }

      return classes.join(' ');
    },
    hasDescription: function hasDescription() {
      return !!this.$slots.description;
    }
  },
  methods: {
    onChanged: function onChanged(e) {
      if (this.disabled) return;
      this.$emit('update:modelValue', e.target.value);
      this.$emit('afterChange', e.target.value);
    }
  }
});var _hoisted_1$2 = ["for"];
var _hoisted_2$1 = ["tabindex", "id", "name", "placeholder", "required", "type", "value", "disabled"];
var _hoisted_3$1 = {
  key: 0,
  class: "pgly-wps--tag"
};
var _hoisted_4$1 = {
  key: 0,
  class: "pgly-wps--message"
};
var _hoisted_5$1 = {
  key: 1,
  class: "pgly-wps--description"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.mountClasses)
  }, [vue.createElementVNode("label", {
    class: vue.normalizeClass(['pgly-wps--label', {
      hidden: !_ctx.label
    }]),
    for: _ctx.id
  }, vue.toDisplayString(_ctx.label), 11, _hoisted_1$2), vue.createElementVNode("div", {
    class: vue.normalizeClass(['pgly-wps--content', {
      'pgly-wps--tagged': _ctx.tag
    }])
  }, [vue.createElementVNode("input", {
    tabindex: _ctx.tabindex,
    id: _ctx.id,
    name: _ctx.id,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    type: _ctx.type,
    value: _ctx.modelValue,
    disabled: _ctx.disabled,
    onInput: _cache[0] || (_cache[0] = function () {
      return _ctx.onChanged && _ctx.onChanged.apply(_ctx, arguments);
    })
  }, null, 40, _hoisted_2$1), _ctx.tag ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3$1, vue.toDisplayString(_ctx.tag), 1)) : vue.createCommentVNode("", true)], 2), _ctx.error.message ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$1, vue.toDisplayString(_ctx.error.message), 1)) : vue.createCommentVNode("", true), _ctx.hasDescription ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_5$1, [vue.renderSlot(_ctx.$slots, "description")])) : vue.createCommentVNode("", true)], 2);
}script$3.render = render$3;var script$2 = defineComponent({
  name: 'PglyBasicSelect',
  data: function data() {
    return {
      open: false
    };
  },
  emits: ['update:modelValue', 'afterChange'],
  props: {
    modelValue: {
      type: String,
      default: undefined
    },
    id: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: []
    },
    tabindex: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Object,
      default: {
        state: false
      }
    }
  },
  computed: {
    mountClasses: function mountClasses() {
      var classes = ['pgly-wps--field'];

      if (this.error.state) {
        classes.push('pgly-wps--error');
      }

      return classes.join(' ');
    },
    getLabel: function getLabel() {
      var _this = this,
          _ref,
          _found$label;

      var found = this.options.find(function (option) {
        return option.value === _this.modelValue;
      });
      return (_ref = (_found$label = found === null || found === void 0 ? void 0 : found.label) !== null && _found$label !== void 0 ? _found$label : this.placeholder) !== null && _ref !== void 0 ? _ref : 'Select...';
    },
    hasDescription: function hasDescription() {
      return !!this.$slots.description;
    }
  },
  methods: {
    onOpenSelect: function onOpenSelect() {
      if (this.disabled) return;
      this.open = !this.open;
    },
    onClickItem: function onClickItem(option) {
      if (this.disabled) return;
      this.open = false;
      this.$emit('update:modelValue', option.value);
      this.$emit('afterChange', option.value);
    }
  }
});var _hoisted_1$1 = ["for"];
var _hoisted_2 = ["id", "tabindex"];

var _hoisted_3 = /*#__PURE__*/vue.createElementVNode("svg", {
  height: "48",
  viewBox: "0 0 48 48",
  width: "48",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/vue.createElementVNode("path", {
  d: "M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"
}), /*#__PURE__*/vue.createElementVNode("path", {
  d: "M0-.75h48v48h-48z",
  fill: "none"
})], -1);

var _hoisted_4 = ["onClick"];
var _hoisted_5 = {
  key: 0,
  class: "pgly-wps--message"
};
var _hoisted_6 = {
  key: 1,
  class: "pgly-wps--description"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.mountClasses)
  }, [vue.createElementVNode("label", {
    class: vue.normalizeClass(['pgly-wps--label', {
      hidden: !_ctx.label
    }]),
    for: _ctx.id
  }, vue.toDisplayString(_ctx.label), 11, _hoisted_1$1), vue.createElementVNode("div", {
    class: "pgly-wps--select",
    id: _ctx.id,
    tabindex: _ctx.tabindex,
    onBlur: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.open = false;
    })
  }, [vue.createElementVNode("div", {
    class: vue.normalizeClass(["selected", {
      open: _ctx.open
    }]),
    onClick: _cache[0] || (_cache[0] = function () {
      return _ctx.onOpenSelect && _ctx.onOpenSelect.apply(_ctx, arguments);
    })
  }, [vue.createTextVNode(vue.toDisplayString(_ctx.getLabel) + " ", 1), _hoisted_3], 2), vue.createElementVNode("div", {
    class: vue.normalizeClass(["items", {
      selectHide: !_ctx.open
    }])
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.options, function (option) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["item", {
        current: option.value === _ctx.modelValue
      }]),
      key: option.value,
      onClick: function onClick($event) {
        return _ctx.onClickItem(option);
      }
    }, vue.toDisplayString(option.label), 11, _hoisted_4);
  }), 128))], 2)], 40, _hoisted_2), _ctx.error.message ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, vue.toDisplayString(_ctx.error.message), 1)) : vue.createCommentVNode("", true), _ctx.hasDescription ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_6, [vue.renderSlot(_ctx.$slots, "description")])) : vue.createCommentVNode("", true)], 2);
}script$2.render = render$2;var script$1 = defineComponent({
  name: 'PglyRow'
});var _hoisted_1 = {
  class: "pgly-wps--row"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.renderSlot(_ctx.$slots, "default")]);
}script$1.render = render$1;var script = defineComponent({
  name: 'PglyColumn',
  props: {
    size: {
      type: Number,
      default: 12,
      validator: function validator(value) {
        return value >= 1 && value <= 12;
      }
    }
  }
});function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(['pgly-wps--column', "pgly-wps-col--".concat(_ctx.size)])
  }, [vue.renderSlot(_ctx.$slots, "default")], 2);
}script.render = render;/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,PglyBadges: script$h,PglyNavigator: script$g,PglyNotifications: script$e,PglyToaster: script$c,PglyAsyncButton: script$a,PglyAsyncIconButton: script$9,PglyBadge: script$i,PglyExplorer: script$8,PglyLinkButton: script$7,PglyNotification: script$f,PglySpinner: script$b,PglySyncButton: script$6,PglySyncIconButton: script$5,PglyToast: script$d,PglyBasicCheckbox: script$4,PglyBasicInput: script$3,PglyBasicSelect: script$2,PglyRow: script$1,PglyColumn: script});var install = function installVuePglyWpsSettings(app) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,PglyBadges: script$h,PglyNavigator: script$g,PglyNotifications: script$e,PglyToaster: script$c,PglyAsyncButton: script$a,PglyAsyncIconButton: script$9,PglyBadge: script$i,PglyExplorer: script$8,PglyLinkButton: script$7,PglyNotification: script$f,PglySpinner: script$b,PglySyncButton: script$6,PglySyncIconButton: script$5,PglyToast: script$d,PglyBasicCheckbox: script$4,PglyBasicInput: script$3,PglyBasicSelect: script$2,PglyRow: script$1,PglyColumn: script});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    var key = componentName;
    var val = component;
    install[key] = val;
  }
});module.exports=install;