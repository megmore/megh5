'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/*!
 * Vue.js v2.6.7
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeLetters = 'a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD';
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeLetters + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeLetters + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if (process.env.NODE_ENV !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res)) {
      // issue #9511
      // reassign to res to avoid catch triggering multiple times when nested calls
      res = res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var isStable = slots ? !!slots.$stable : true;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && Object.keys(normalSlots).length === 0) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && res.length === 0 ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);

        if (!(key in hash) && !(camelizedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + camelizedKey] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (process.env.NODE_ENV !== 'production' && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if (process.env.NODE_ENV !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  var owner = currentRenderingInstance;

  if (isDef(factory.owners)) {
    // already pending
    factory.owners.push(owner);
  } else {
    var owners = factory.owners = [owner];
    var sync = true;

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.

if (inBrowser && getNow() > document.createEvent('Event').timeStamp) {
  // if the low-res timestamp which is bigger than the event timestamp
  // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
  // and we need to use the hi-res version for event listeners as well.
  getNow = function () {
    return performance.now();
  };
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.7';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // #9462 bail for iOS 9 bug: event.timeStamp is 0 after history.pushState
      e.timeStamp === 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var vueClassComponent_common = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var Vue$1 = _interopDefault(Vue);

var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata;

function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;

function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}

function mixins() {
  var Ctors = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    Ctors[_i] = arguments[_i];
  }

  return Vue$1.extend({
    mixins: Ctors
  });
}

function isPrimitive(value) {
  var type = typeof value;
  return value == null || type !== 'object' && type !== 'function';
}

function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this; // proxy to actual vm


    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function () {
            return vm[key];
          },
          set: function (value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!(Component.prototype instanceof Vue$1) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
    }
  }

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured' // 2.5
];

function componentFactory(Component, options) {
  if (options === void 0) {
    options = {};
  }

  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function () {
            var _a;

            return _a = {}, _a[key] = descriptor.value, _a;
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function () {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue$1 ? superProto.constructor : Vue$1;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}

var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // `prototype` should not be overwritten
    if (key === 'prototype') {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '" + key + "' declared on class '" + Original.name + "' " + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
    }

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, keys);
};

exports.default = Component;
exports.createDecorator = createDecorator;
exports.mixins = mixins;
});

var Component = unwrapExports(vueClassComponent_common);
var vueClassComponent_common_1 = vueClassComponent_common.createDecorator;
var vueClassComponent_common_2 = vueClassComponent_common.mixins;

/** vue-property-decorator verson 7.3.0 MIT LICENSE copyright 2018 kaorun343 */
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */

function Prop(options) {
  if (options === void 0) {
    options = {};
  }

  return vueClassComponent_common_1(function (componentOptions, k) {
    (componentOptions.props || (componentOptions.props = {}))[k] = options;
  });
}

var hyphenateRE$1 = /\B([A-Z])/g;

var hyphenate$1 = function (str) {
  return str.replace(hyphenateRE$1, '-$1').toLowerCase();
};
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */


function Emit(event) {
  return function (_target, key, descriptor) {
    key = hyphenate$1(key);
    var original = descriptor.value;

    descriptor.value = function emitter() {
      var _this = this;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var emit = function (returnValue) {
        if (returnValue !== undefined) args.unshift(returnValue);

        _this.$emit.apply(_this, [event || key].concat(args));
      };

      var returnValue = original.apply(this, args);

      if (isPromise$1(returnValue)) {
        returnValue.then(function (returnValue) {
          emit(returnValue);
        });
      } else {
        emit(returnValue);
      }
    };
  };
}

function isPromise$1(obj) {
  return obj instanceof Promise || obj && typeof obj.then === 'function';
}

var clipboard = createCommonjsModule(function (module, exports) {
/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
  module.exports = factory();
})(commonjsGlobal, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _clipboardAction = __webpack_require__(1);

      var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

      var _tinyEmitter = __webpack_require__(3);

      var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

      var _goodListener = __webpack_require__(4);

      var _goodListener2 = _interopRequireDefault(_goodListener);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      /**
       * Base class which takes one or more elements, adds event listeners to them,
       * and instantiates a new `ClipboardAction` on each click.
       */


      var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);
        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */


        function Clipboard(trigger, options) {
          _classCallCheck(this, Clipboard);

          var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

          _this.resolveOptions(options);

          _this.listenClick(trigger);

          return _this;
        }
        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
          key: 'resolveOptions',
          value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
          }
          /**
           * Adds a click event listener to the passed trigger.
           * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
           */

        }, {
          key: 'listenClick',
          value: function listenClick(trigger) {
            var _this2 = this;

            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
              return _this2.onClick(e);
            });
          }
          /**
           * Defines a new `ClipboardAction` on each click event.
           * @param {Event} e
           */

        }, {
          key: 'onClick',
          value: function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
              this.clipboardAction = null;
            }

            this.clipboardAction = new _clipboardAction2.default({
              action: this.action(trigger),
              target: this.target(trigger),
              text: this.text(trigger),
              container: this.container,
              trigger: trigger,
              emitter: this
            });
          }
          /**
           * Default `action` lookup function.
           * @param {Element} trigger
           */

        }, {
          key: 'defaultAction',
          value: function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
          }
          /**
           * Default `target` lookup function.
           * @param {Element} trigger
           */

        }, {
          key: 'defaultTarget',
          value: function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
              return document.querySelector(selector);
            }
          }
          /**
           * Returns the support of the given action, or all actions if no action is
           * given.
           * @param {String} [action]
           */

        }, {
          key: 'defaultText',

          /**
           * Default `text` lookup function.
           * @param {Element} trigger
           */
          value: function defaultText(trigger) {
            return getAttributeValue('text', trigger);
          }
          /**
           * Destroy lifecycle.
           */

        }, {
          key: 'destroy',
          value: function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
              this.clipboardAction.destroy();
              this.clipboardAction = null;
            }
          }
        }], [{
          key: 'isSupported',
          value: function isSupported() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
            var actions = typeof action === 'string' ? [action] : action;
            var support = !!document.queryCommandSupported;
            actions.forEach(function (action) {
              support = support && !!document.queryCommandSupported(action);
            });
            return support;
          }
        }]);

        return Clipboard;
      }(_tinyEmitter2.default);
      /**
       * Helper function to retrieve attribute value.
       * @param {String} suffix
       * @param {Element} element
       */


      function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
          return;
        }

        return element.getAttribute(attribute);
      }

      module.exports = Clipboard;
      /***/
    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      var _select = __webpack_require__(2);

      var _select2 = _interopRequireDefault(_select);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      /**
       * Inner class which performs selection from either `text` or `target`
       * properties and then executes copy or cut operations.
       */


      var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
          _classCallCheck(this, ClipboardAction);

          this.resolveOptions(options);
          this.initSelection();
        }
        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
          key: 'resolveOptions',
          value: function resolveOptions() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.action = options.action;
            this.container = options.container;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;
            this.selectedText = '';
          }
          /**
           * Decides which selection strategy is going to be applied based
           * on the existence of `text` and `target` properties.
           */

        }, {
          key: 'initSelection',
          value: function initSelection() {
            if (this.text) {
              this.selectFake();
            } else if (this.target) {
              this.selectTarget();
            }
          }
          /**
           * Creates a fake textarea element, sets its value from `text` property,
           * and makes a selection on it.
           */

        }, {
          key: 'selectFake',
          value: function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
            this.removeFake();

            this.fakeHandlerCallback = function () {
              return _this.removeFake();
            };

            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
            this.fakeElem = document.createElement('textarea'); // Prevent zooming on iOS

            this.fakeElem.style.fontSize = '12pt'; // Reset box model

            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0'; // Move element out of screen horizontally

            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            this.fakeElem.style.top = yPosition + 'px';
            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;
            this.container.appendChild(this.fakeElem);
            this.selectedText = (0, _select2.default)(this.fakeElem);
            this.copyText();
          }
          /**
           * Only removes the fake element after another click event, that way
           * a user can hit `Ctrl+C` to copy because selection still exists.
           */

        }, {
          key: 'removeFake',
          value: function removeFake() {
            if (this.fakeHandler) {
              this.container.removeEventListener('click', this.fakeHandlerCallback);
              this.fakeHandler = null;
              this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
              this.container.removeChild(this.fakeElem);
              this.fakeElem = null;
            }
          }
          /**
           * Selects the content from element passed on `target` property.
           */

        }, {
          key: 'selectTarget',
          value: function selectTarget() {
            this.selectedText = (0, _select2.default)(this.target);
            this.copyText();
          }
          /**
           * Executes the copy operation based on the current selection.
           */

        }, {
          key: 'copyText',
          value: function copyText() {
            var succeeded = void 0;

            try {
              succeeded = document.execCommand(this.action);
            } catch (err) {
              succeeded = false;
            }

            this.handleResult(succeeded);
          }
          /**
           * Fires an event based on the copy operation result.
           * @param {Boolean} succeeded
           */

        }, {
          key: 'handleResult',
          value: function handleResult(succeeded) {
            this.emitter.emit(succeeded ? 'success' : 'error', {
              action: this.action,
              text: this.selectedText,
              trigger: this.trigger,
              clearSelection: this.clearSelection.bind(this)
            });
          }
          /**
           * Moves focus away from `target` and back to the trigger, removes current selection.
           */

        }, {
          key: 'clearSelection',
          value: function clearSelection() {
            if (this.trigger) {
              this.trigger.focus();
            }

            window.getSelection().removeAllRanges();
          }
          /**
           * Sets the `action` to be performed which can be either 'copy' or 'cut'.
           * @param {String} action
           */

        }, {
          key: 'destroy',

          /**
           * Destroy lifecycle.
           */
          value: function destroy() {
            this.removeFake();
          }
        }, {
          key: 'action',
          set: function set() {
            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
            this._action = action;

            if (this._action !== 'copy' && this._action !== 'cut') {
              throw new Error('Invalid "action" value, use either "copy" or "cut"');
            }
          }
          /**
           * Gets the `action` property.
           * @return {String}
           */
          ,
          get: function get() {
            return this._action;
          }
          /**
           * Sets the `target` property using an element
           * that will be have its content copied.
           * @param {Element} target
           */

        }, {
          key: 'target',
          set: function set(target) {
            if (target !== undefined) {
              if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                if (this.action === 'copy' && target.hasAttribute('disabled')) {
                  throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                }

                if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                  throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                }

                this._target = target;
              } else {
                throw new Error('Invalid "target" value, use a valid Element');
              }
            }
          }
          /**
           * Gets the `target` property.
           * @return {String|HTMLElement}
           */
          ,
          get: function get() {
            return this._target;
          }
        }]);

        return ClipboardAction;
      }();

      module.exports = ClipboardAction;
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      function select(element) {
        var selectedText;

        if (element.nodeName === 'SELECT') {
          element.focus();
          selectedText = element.value;
        } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
          var isReadOnly = element.hasAttribute('readonly');

          if (!isReadOnly) {
            element.setAttribute('readonly', '');
          }

          element.select();
          element.setSelectionRange(0, element.value.length);

          if (!isReadOnly) {
            element.removeAttribute('readonly');
          }

          selectedText = element.value;
        } else {
          if (element.hasAttribute('contenteditable')) {
            element.focus();
          }

          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(element);
          selection.removeAllRanges();
          selection.addRange(range);
          selectedText = selection.toString();
        }

        return selectedText;
      }

      module.exports = select;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports) {
      function E() {// Keep this empty so it's easier to inherit from
        // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
      }

      E.prototype = {
        on: function (name, callback, ctx) {
          var e = this.e || (this.e = {});
          (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
          });
          return this;
        },
        once: function (name, callback, ctx) {
          var self = this;

          function listener() {
            self.off(name, listener);
            callback.apply(ctx, arguments);
          }
          listener._ = callback;
          return this.on(name, listener, ctx);
        },
        emit: function (name) {
          var data = [].slice.call(arguments, 1);
          var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
          var i = 0;
          var len = evtArr.length;

          for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
          }

          return this;
        },
        off: function (name, callback) {
          var e = this.e || (this.e = {});
          var evts = e[name];
          var liveEvents = [];

          if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i++) {
              if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            }
          } // Remove event from queue to prevent memory leak
          // Suggested by https://github.com/lazd
          // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


          liveEvents.length ? e[name] = liveEvents : delete e[name];
          return this;
        }
      };
      module.exports = E;
      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      var is = __webpack_require__(5);

      var delegate = __webpack_require__(6);
      /**
       * Validates all params and calls the right
       * listener function based on its target type.
       *
       * @param {String|HTMLElement|HTMLCollection|NodeList} target
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listen(target, type, callback) {
        if (!target && !type && !callback) {
          throw new Error('Missing required arguments');
        }

        if (!is.string(type)) {
          throw new TypeError('Second argument must be a String');
        }

        if (!is.fn(callback)) {
          throw new TypeError('Third argument must be a Function');
        }

        if (is.node(target)) {
          return listenNode(target, type, callback);
        } else if (is.nodeList(target)) {
          return listenNodeList(target, type, callback);
        } else if (is.string(target)) {
          return listenSelector(target, type, callback);
        } else {
          throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
        }
      }
      /**
       * Adds an event listener to a HTML element
       * and returns a remove listener function.
       *
       * @param {HTMLElement} node
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listenNode(node, type, callback) {
        node.addEventListener(type, callback);
        return {
          destroy: function () {
            node.removeEventListener(type, callback);
          }
        };
      }
      /**
       * Add an event listener to a list of HTML elements
       * and returns a remove listener function.
       *
       * @param {NodeList|HTMLCollection} nodeList
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listenNodeList(nodeList, type, callback) {
        Array.prototype.forEach.call(nodeList, function (node) {
          node.addEventListener(type, callback);
        });
        return {
          destroy: function () {
            Array.prototype.forEach.call(nodeList, function (node) {
              node.removeEventListener(type, callback);
            });
          }
        };
      }
      /**
       * Add an event listener to a selector
       * and returns a remove listener function.
       *
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @return {Object}
       */


      function listenSelector(selector, type, callback) {
        return delegate(document.body, selector, type, callback);
      }

      module.exports = listen;
      /***/
    },
    /* 5 */

    /***/
    function (module, exports) {
      /**
       * Check if argument is a HTML element.
       *
       * @param {Object} value
       * @return {Boolean}
       */
      exports.node = function (value) {
        return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
      };
      /**
       * Check if argument is a list of HTML elements.
       *
       * @param {Object} value
       * @return {Boolean}
       */


      exports.nodeList = function (value) {
        var type = Object.prototype.toString.call(value);
        return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
      };
      /**
       * Check if argument is a string.
       *
       * @param {Object} value
       * @return {Boolean}
       */


      exports.string = function (value) {
        return typeof value === 'string' || value instanceof String;
      };
      /**
       * Check if argument is a function.
       *
       * @param {Object} value
       * @return {Boolean}
       */


      exports.fn = function (value) {
        var type = Object.prototype.toString.call(value);
        return type === '[object Function]';
      };
      /***/

    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      var closest = __webpack_require__(7);
      /**
       * Delegates event to a selector.
       *
       * @param {Element} element
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @param {Boolean} useCapture
       * @return {Object}
       */


      function _delegate(element, selector, type, callback, useCapture) {
        var listenerFn = listener.apply(this, arguments);
        element.addEventListener(type, listenerFn, useCapture);
        return {
          destroy: function () {
            element.removeEventListener(type, listenerFn, useCapture);
          }
        };
      }
      /**
       * Delegates event to a selector.
       *
       * @param {Element|String|Array} [elements]
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @param {Boolean} useCapture
       * @return {Object}
       */


      function delegate(elements, selector, type, callback, useCapture) {
        // Handle the regular Element usage
        if (typeof elements.addEventListener === 'function') {
          return _delegate.apply(null, arguments);
        } // Handle Element-less usage, it defaults to global delegation


        if (typeof type === 'function') {
          // Use `document` as the first parameter, then apply arguments
          // This is a short way to .unshift `arguments` without running into deoptimizations
          return _delegate.bind(null, document).apply(null, arguments);
        } // Handle Selector-based usage


        if (typeof elements === 'string') {
          elements = document.querySelectorAll(elements);
        } // Handle Array-like based usage


        return Array.prototype.map.call(elements, function (element) {
          return _delegate(element, selector, type, callback, useCapture);
        });
      }
      /**
       * Finds closest match and invokes callback.
       *
       * @param {Element} element
       * @param {String} selector
       * @param {String} type
       * @param {Function} callback
       * @return {Function}
       */


      function listener(element, selector, type, callback) {
        return function (e) {
          e.delegateTarget = closest(e.target, selector);

          if (e.delegateTarget) {
            callback.call(element, e);
          }
        };
      }

      module.exports = delegate;
      /***/
    },
    /* 7 */

    /***/
    function (module, exports) {
      var DOCUMENT_NODE_TYPE = 9;
      /**
       * A polyfill for Element.matches()
       */

      if (typeof Element !== 'undefined' && !Element.prototype.matches) {
        var proto = Element.prototype;
        proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
      }
      /**
       * Finds the closest parent that matches a selector.
       *
       * @param {Element} element
       * @param {String} selector
       * @return {Function}
       */


      function closest(element, selector) {
        while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
          if (typeof element.matches === 'function' && element.matches(selector)) {
            return element;
          }

          element = element.parentNode;
        }
      }

      module.exports = closest;
      /***/
    }])
  );
});
});

unwrapExports(clipboard);

var libCjs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var ClipboardJS = _interopDefault(clipboard);

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof2(obj) {
        return typeof obj;
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof2(obj);
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

var arrayClear = function arrayClear(arr) {
  if (arr instanceof Array) {
    arr.splice(0, arr.length);
  }
};

var arrayUnique = function arrayUnique(arr) {
  var result = [];
  var str = [];
  var num = [];
  arr.forEach(function (item) {
    if (isNaN(item)) {
      str.push(item);
    } else {
      num.push(item);
    }
  });
  arr = num.sort(function (a, b) {
    return a - b;
  }).concat(str.sort());
  arr.forEach(function (a) {
    if (result.includes(a)) {
      return;
    }

    result.push(a);
  });
  return result;
};

var arrayUniqueByField = function arrayUniqueByField(arr) {
  var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var result = [];
  arr.forEach(function (item) {
    var ids = result.map(function (i) {
      return i[field];
    });

    if (!ids.includes(item[field])) {
      result.push(item);
    }
  });
  return result;
};

function deepCopy(source) {
  var target;

  if (source instanceof Array) {
    target = [];
    source.forEach(function (item) {
      if (_typeof_1(item) === 'object') {
        target.push(deepCopy(item));
      } else {
        target.push(item);
      }
    });
  } else if (source instanceof Object) {
    target = {};

    for (var prop in source) {
      if (_typeof_1(source[prop]) === 'object') {
        target[prop] = deepCopy(source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  } else {
    return source;
  }

  return target;
}

var typeEqual = function typeEqual(v1, v2) {
  var allIsNotNull = [v1, v2].every(function (v) {
    return v !== null;
  });

  if (allIsNotNull) {
    return _typeof_1(v1) === _typeof_1(v2);
  }

  return [v1, v2].every(function (v) {
    return v === null;
  });
};

var isObject = function isObject(v) {
  return v !== null && _typeof_1(v) === 'object';
};

var deepEqual = function deepEqual(obj1, obj2) {
  var result = true;

  if (obj1 === obj2) {
    return true;
  }

  if (!typeEqual(obj1, obj2)) {
    return false;
  }

  if (!isObject(obj1)) {
    return obj1 === obj2;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length) {
    // 数组长度不同
    return result = false;
  }

  for (var prop in obj1) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];

    if (_typeof_1(val1) !== _typeof_1(val2)) {
      // 数据类型不同
      return result = false;
    } else if (_typeof_1(val1) === 'object') {
      result = deepEqual(val1, val2);
    } else {
      result = val1 === val2;
    }

    if (result === false) {
      return false;
    }
  }

  return result;
};
/**
 *
 * @param data 数据源
 * @param field
 * @param key 目标id
 * @param childField 子项所在字段
 */


function findNode() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$field = _ref.field,
      field = _ref$field === void 0 ? 'id' : _ref$field,
      _ref$key = _ref.key,
      key = _ref$key === void 0 ? '' : _ref$key,
      _ref$childField = _ref.childField,
      childField = _ref$childField === void 0 ? 'children' : _ref$childField;

  var target;
  var childrenList = {};

  if (data instanceof Array) {
    childrenList = data;
  } else {
    childrenList = data[childField];
  }

  for (var i = 0; i <= childrenList.length; i++) {
    var children = childrenList[i];

    if (children) {
      if (children[field] === key) {
        return target = children;
      } else if (children[childField] && children[childField].length) {
        target = findNode({
          data: children,
          key: key,
          childField: childField,
          field: field
        });

        if (target && target[field] === key) {
          return target;
        }
      }
    }
  }

  return target;
}
/**
 * 封装clipboard的复制功能
 * @param text
 */


function clip2Board() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var domId = "clipDom".concat(new Date().getTime());
  var $dom = document.createElement('button');
  var $container = document.body;
  $dom.style.display = 'hidden';
  $dom.style.position = 'fixed';
  $dom.setAttribute('id', domId);
  $dom.setAttribute('data-clipboard-text', text);
  $container.appendChild($dom);
  var Clipboard = new ClipboardJS("#".concat(domId));
  return new Promise(function (resolve, reject) {
    Clipboard.on('success', function (e) {
      e.clearSelection();
      $container.removeChild($dom);
      resolve(e.text);
    });
    Clipboard.on('error', function (e) {
      $container.removeChild($dom);
      reject(e.text);
    });
    $dom.click();
  });
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;
/**
 * 校验方法合集
 */

var REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var REGEX_URL = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
var REGEX_UPPER_CASE = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
var REGEX_LOWER_CASE = /^[a-z]+$/;
var REGEX_HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
var REGEX_STYLE_UNIT = /px|vw|rem|em|%|auto|unset$/;
var REGEX_UA_CLIENT_MOBILE = /mobile/gi;
var REGEX_UA_OS_IOS = /ipad|iphone/gi;
var REGEX_UA_OS_ANDROID = /android/gi;
var REGEX_UA_OS_WINDOWS = /window|mac|linux/gi;
var REGEX_BASE64 = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
/**
 * url校验
 *
 * @param    {string}  val   被校验参数
 * @returns   {boolean}
 *
 * @date       2018/2/19
 * @author   nocoolyoyo
 */

function isURL(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_URL.test(val);
}
/**
 * BASE64
 * @param val
 * @return {boolean}
 */


function isBase64(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_BASE64.test(val);
}
/**
 * 小写校验
 * @param val
 */


function isLowerCase(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_LOWER_CASE.test(val);
}
/**
 * 大写校验
 *
 * @param    {string}  val   被校验参数
 * @returns   {boolean}
 */


function isUpperCase(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_UPPER_CASE.test(val);
}
/**
 * 邮箱校验
 *
 * @param    {string}  val   被校验参数
 * @returns   {boolean}
 */


function isEmail(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_EMAIL.test(val);
}
/**
 * 空字符串校验
 * @param val
 * @returns {boolean}
 */


function isTrimEmpty(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return val.trim() === '';
}
/**
 * 空对象校验
 * @param val
 * @return {boolean}
 */


function isEmptyObject(val) {
  if (_typeof_1(val) !== 'object') {
    return false;
  }

  return Object.keys(val).length === 0;
}
/**
 * 十六进制颜色
 * @param val
 * @return {boolean}
 */


function isHexColor(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_HEX_COLOR.test(val);
}
/**
 * 样式表单位
 * @param val
 * @return {boolean}
 */


function isStyleUnit(val) {
  if (typeof val !== 'string') {
    return false;
  }

  return REGEX_STYLE_UNIT.test(val);
}
/**
 * 是否是手机
 * @return {boolean}
 */


function isMobile() {
  return REGEX_UA_CLIENT_MOBILE.test(navigator.userAgent);
}
/**
 * 是否是IOS系统
 * @return {boolean}
 */


function isOSIos() {
  return REGEX_UA_OS_IOS.test(navigator.userAgent);
}
/**
 * 是否是ANDROID系统
 * @return {boolean}
 */


function isOSAndroid() {
  return REGEX_UA_OS_ANDROID.test(navigator.userAgent);
}
/**
 * 是否是WINDOWS系统
 * @return {boolean}
 */


function isOSWindows() {
  return REGEX_UA_OS_WINDOWS.test(navigator.userAgent);
}

var Client =
/*#__PURE__*/
function () {
  function Client() {
    classCallCheck(this, Client);
    this.lang = navigator.language;
    this.type = 'pc';
    this.version = '';
    this.OS = 'Windows';
    this.init();
  }

  createClass(Client, [{
    key: "init",
    value: function init() {
      var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (/Android (\d+(\.\d+)+)/.test(navigator.userAgent)) {
        // @ts-ignore
        this.version = navigator.userAgent.match(/Android (\d+(\.\d+)+)/)[1];
      } else if (/iPhone OS (\d+(_\d+)+)/.test(navigator.userAgent)) {
        // @ts-ignore
        this.version = navigator.userAgent.match(/iPhone OS (\d+(_\d+)+)/)[1].replace(/_/g, '.');
      } else {
        this.version = '';
      }

      if (isMobile()) {
        this.type = 'mobile';
      } else {
        this.type = 'pc';
      }

      if (isOSIos()) {
        this.OS = 'IOS';
      } else if (isOSAndroid()) {
        this.OS = 'Android';
      } else if (isOSWindows()) {
        this.OS = 'Windows';
      }

      if (!!lang) {
        var langMap = lang.split('-');

        if (langMap.length > 1) {
          lang = "".concat(langMap[0], "-").concat(langMap[1].toUpperCase());
        } else {
          lang = langMap[0];
        }

        this.lang = lang;
      } else {
        this.lang = navigator.language;
      } // 挂载硬件信息到节点属性


      if (isMount) {
        var $root = document.documentElement;
        $root.setAttribute('data-client-os', this.OS);
        $root.setAttribute('data-client-type', this.type);
        $root.setAttribute('lang', this.lang);

        if (this.lang === 'ar') {
          $root.setAttribute('dir', 'rtl');
        } else if ($root.hasAttribute('dir')) {
          $root.removeAttribute('dir');
        }
      }
    }
  }]);
  return Client;
}();

var device = new Client();
/**
 * Created by nocoolyoyo on 2018/7/17.
 */
//过渡算法

/**
 * @param t 动画已消耗时间
 * @param b 原始值
 * @param c 目标值
 * @param d 持续时间
 */

function linear(t, b, c, d) {
  return c * t / d + b;
}

function easeIn(t, b, c, d) {
  return c * (t /= d) * t + b;
}

function strongEaseIn(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}

function strongEaseOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function sineaseIn(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

function sineaseOut(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

var TRANS_FUNCS = ['linear', 'easeIn', 'strongEaseIn', 'strongEaseOut', 'sineaseIn', 'sineaseOut'];
var META_CODE = {
  x: {
    start: 'left',
    size: 'width',
    clientSize: 'clientWidth',
    scrollStart: 'scrollLeft',
    scrollSize: 'scrollWidth'
  },
  y: {
    start: 'top',
    size: 'height',
    clientSize: 'clientHeight',
    scrollStart: 'scrollTop',
    scrollSize: 'scrollHeight'
  }
};
/**
 * 滚动基础方法
 * @param axis 滚动轴线
 * @param $scroller
 * @param justify 滚动偏差值： number, 复数向下滚动， 正数向上滚动
 * @param target 滚动目标, HTMLElement或者string, start:表示滚动到头部， end表示底部,
 * @param duration,
 * @param transition
 * @param onFinish
 */

function scrollFunc() {
  var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'x';
  var $scroller = arguments.length > 1 ? arguments[1] : undefined;

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$justify = _ref.justify,
      justify = _ref$justify === void 0 ? 0 : _ref$justify,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? 0 : _ref$target,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 500 : _ref$duration,
      _ref$transition = _ref.transition,
      transition = _ref$transition === void 0 ? 'sineaseOut' : _ref$transition,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'center' : _ref$position;

  return new Promise(function (resolve) {
    if (!$scroller || !TRANS_FUNCS.includes(transition)) {
      resolve();
    }

    var META = META_CODE[axis];
    var isDomTarget = typeof target !== 'number' && target !== 'start' && target !== 'end';
    var scroll = 0; // 滚动值计算

    if (isDomTarget) {
      var rect = target.getBoundingClientRect();
      var posScroll = position === 'start' ? 0 : position === 'end' // @ts-ignore
      ? $scroller[META.clientSize] - rect[META.size] : // @ts-ignore
      ($scroller[META.clientSize] - rect[META.size]) / 2; // @ts-ignore

      scroll = rect[META.start] - posScroll + justify;
    } else {
      // @ts-ignore
      scroll = (target === 'start' // @ts-ignore
      ? -$scroller[META.scrollStart] : target === 'end' // @ts-ignore
      ? $scroller[META.scrollSize] - $scroller[META.scrollStart] - $scroller[META.clientSize] : target) + justify;
    }

    if (scroll === 0) {
      resolve();
    } // @ts-ignore


    var scrollValue = $scroller[META.scrollSize] - $scroller[META.clientSize]; // @ts-ignore

    var scrollStart = $scroller[META.scrollStart];
    var start;

    var _step2; //eval(transition): number


    var transFunc = function () {
      if (transition === 'linear') {
        return sineaseIn;
      } else if (transition === 'easeIn') {
        return easeIn;
      } else if (transition === 'strongEaseIn') {
        return strongEaseIn;
      } else if (transition === 'strongEaseOut') {
        return strongEaseOut;
      } else if (transition === 'sineaseIn') {
        return sineaseIn;
      } else if (transition === 'sineaseOut') {
        return sineaseOut;
      }
    }(); // 滚动值矫正


    if (scroll > 0) {
      var maxScroll = scrollValue - scrollStart;
      scroll = scroll > maxScroll ? maxScroll : scroll; // @ts-ignore

      _step2 = function step(timestamp) {
        if (!start) {
          start = timestamp;
        } // @ts-ignore


        var stepScroll = transFunc(timestamp - start, 0, scroll, duration);
        stepScroll = stepScroll > scroll ? scroll : stepScroll; // @ts-ignore

        $scroller[META.scrollStart] = scrollStart + stepScroll;

        if (scroll > stepScroll) {
          // @ts-ignore
          requestAnimationFrame(_step2);
        } else {
          resolve();
        }
      };
    } else {
      // @ts-ignore
      var _maxScroll = -$scroller[META.scrollStart];

      scroll = scroll < _maxScroll ? _maxScroll : scroll; // @ts-ignore

      _step2 = function _step(timestamp) {
        if (!start) {
          start = timestamp;
        } // @ts-ignore


        var stepScroll = transFunc(timestamp - start, 0, scroll, duration);
        stepScroll = stepScroll < scroll ? scroll : stepScroll; // @ts-ignore

        $scroller[META.scrollStart] = scrollStart + stepScroll;

        if (scroll < stepScroll) {
          // @ts-ignore
          requestAnimationFrame(_step2);
        } else {
          resolve();
        }
      };
    } // @ts-ignore


    requestAnimationFrame(_step2);
  });
}

function scrollToX($scroller, scrollOpts) {
  return scrollFunc('x', $scroller, scrollOpts);
}

function scrollToY($scroller, scrollOpts) {
  return scrollFunc('y', $scroller, scrollOpts);
}
/**
 * 图片预加载完返回图片的信息
 * @param url
 */


function imageLoaded(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();

    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height
      }); // real_width,real_height

      img = null;
    };

    img.onerror = function () {
      reject('load image fail');
    };

    img.src = url;
  });
}
/**
 * @function 将传入的属性名转为驼峰
 *
 * @param name 名字
 * @return {*}
 *
 * @author: nocoolyoyo
 * @date: 2018-03-11
 */


var SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
} //     [field: TElements]: string | number
// }

/**
 * css样式构造
 * @param styleObj 文件后缀名
 * @returns {String}
 *CSSStyleDeclaration
 * @author: nocoolyoyo
 * @date: 2018-03-11
 */


function strStyle(styleObj) {
  var cssStr = '';
  Object.keys(styleObj).forEach(function (key) {
    if (styleObj.hasOwnProperty(key)) cssStr += "".concat(key, ":").concat(styleObj[key], ";");
  });
  return cssStr;
}
/**
 * 获取节点的CSS属性的值
 * @param element {Object} 节点
 * @param styleName {String} 属性名字
 * @returns {*}
 * @author: nocoolyoyo
 * @date: 2018-03-11
 */


function getStyle(element, styleName) {
  if (!element || !styleName) return '';
  styleName = camelCase(styleName);

  if (styleName === 'float') {
    styleName = 'cssFloat';
  }

  try {
    var computed = document['defaultView'].getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : '';
  } catch (e) {
    return element.style[styleName];
  }
}
/**
 * 获取URL全部参数值
 * @param url
 */


function getUrlParams() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;

  var _url = decodeURI(url.replace(/\+/g, '%20')); // console.log(_url)


  var result = {};

  var queryArray = _url.split('?');

  if (queryArray.length <= 1) {
    return result;
  }

  queryArray = queryArray[1].split('&');
  queryArray.forEach(function (query) {
    var queryKVArray = query.split('='); // console.log(queryKVArray)

    result[queryKVArray[0]] = queryKVArray[1];
  });
  return result;
}
/**
 * 获取指定的URL参数值
 * @param name
 * @param url
 */


function getUrlParam(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  if (typeof name !== 'string') console.error('要获取的参数名必须为字符串');

  var _url = decodeURI(url.replace(/\+/g, '%20'));

  var search = _url.substring(_url.lastIndexOf('?') + 1);

  var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"), 'i');
  var r = search.match(reg);
  if (r !== null) return decodeURI(r[2]);
  return '';
}
/**
 * 追加指定的URL参数值,存在会覆盖
 * @param params
 * @param url
 * @param sort
 */


function appendUrlParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cleanUrl = url.split('?')[0];
  var oriParams = getUrlParams(url);
  var newParams = Object.assign(oriParams, params); // url已存在参数

  var Keys = Object.keys(newParams);

  if (sort) {
    Keys = Keys.sort();
  }

  Keys.forEach(function (key) {
    cleanUrl += "&".concat(key, "=").concat(newParams[key]);
  });
  cleanUrl = cleanUrl.replace(/&/, '?');
  return cleanUrl;
}
/**
 * Created by nocoolyoyo on 2018/6/11.
 */


exports.arrayClear = arrayClear;
exports.arrayUnique = arrayUnique;
exports.arrayUniqueByField = arrayUniqueByField;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.findNode = findNode;
exports.clip2Board = clip2Board;
exports.Client = device;
exports.scrollToX = scrollToX;
exports.scrollToY = scrollToY;
exports.imageLoaded = imageLoaded;
exports.camelCase = camelCase;
exports.strStyle = strStyle;
exports.getStyle = getStyle;
exports.easeIn = easeIn;
exports.linear = linear;
exports.sineaseIn = sineaseIn;
exports.sineaseOut = sineaseOut;
exports.strongEaseIn = strongEaseIn;
exports.strongEaseOut = strongEaseOut;
exports.getUrlParam = getUrlParam;
exports.getUrlParams = getUrlParams;
exports.appendUrlParams = appendUrlParams;
exports.REGEX_UA_OS_WINDOWS = REGEX_UA_OS_WINDOWS;
exports.REGEX_UA_OS_ANDROID = REGEX_UA_OS_ANDROID;
exports.REGEX_UA_OS_IOS = REGEX_UA_OS_IOS;
exports.REGEX_UA_CLIENT_MOBILE = REGEX_UA_CLIENT_MOBILE;
exports.REGEX_STYLE_UNIT = REGEX_STYLE_UNIT;
exports.REGEX_LOWER_CASE = REGEX_LOWER_CASE;
exports.REGEX_BASE64 = REGEX_BASE64;
exports.REGEX_EMAIL = REGEX_EMAIL;
exports.REGEX_HEX_COLOR = REGEX_HEX_COLOR;
exports.REGEX_UPPER_CASE = REGEX_UPPER_CASE;
exports.REGEX_URL = REGEX_URL;
exports.isOSAndroid = isOSAndroid;
exports.isOSIos = isOSIos;
exports.isBase64 = isBase64;
exports.isEmail = isEmail;
exports.isEmptyObject = isEmptyObject;
exports.isHexColor = isHexColor;
exports.isLowerCase = isLowerCase;
exports.isMobile = isMobile;
exports.isOSWindows = isOSWindows;
exports.isStyleUnit = isStyleUnit;
exports.isTrimEmpty = isTrimEmpty;
exports.isUpperCase = isUpperCase;
exports.isURL = isURL;
});

unwrapExports(libCjs);
var libCjs_1 = libCjs.arrayClear;
var libCjs_2 = libCjs.arrayUnique;
var libCjs_3 = libCjs.arrayUniqueByField;
var libCjs_4 = libCjs.deepCopy;
var libCjs_5 = libCjs.deepEqual;
var libCjs_6 = libCjs.findNode;
var libCjs_7 = libCjs.clip2Board;
var libCjs_8 = libCjs.Client;
var libCjs_9 = libCjs.scrollToX;
var libCjs_10 = libCjs.scrollToY;
var libCjs_11 = libCjs.imageLoaded;
var libCjs_12 = libCjs.camelCase;
var libCjs_13 = libCjs.strStyle;
var libCjs_14 = libCjs.getStyle;
var libCjs_15 = libCjs.easeIn;
var libCjs_16 = libCjs.linear;
var libCjs_17 = libCjs.sineaseIn;
var libCjs_18 = libCjs.sineaseOut;
var libCjs_19 = libCjs.strongEaseIn;
var libCjs_20 = libCjs.strongEaseOut;
var libCjs_21 = libCjs.getUrlParam;
var libCjs_22 = libCjs.getUrlParams;
var libCjs_23 = libCjs.appendUrlParams;
var libCjs_24 = libCjs.REGEX_UA_OS_WINDOWS;
var libCjs_25 = libCjs.REGEX_UA_OS_ANDROID;
var libCjs_26 = libCjs.REGEX_UA_OS_IOS;
var libCjs_27 = libCjs.REGEX_UA_CLIENT_MOBILE;
var libCjs_28 = libCjs.REGEX_STYLE_UNIT;
var libCjs_29 = libCjs.REGEX_LOWER_CASE;
var libCjs_30 = libCjs.REGEX_BASE64;
var libCjs_31 = libCjs.REGEX_EMAIL;
var libCjs_32 = libCjs.REGEX_HEX_COLOR;
var libCjs_33 = libCjs.REGEX_UPPER_CASE;
var libCjs_34 = libCjs.REGEX_URL;
var libCjs_35 = libCjs.isOSAndroid;
var libCjs_36 = libCjs.isOSIos;
var libCjs_37 = libCjs.isBase64;
var libCjs_38 = libCjs.isEmail;
var libCjs_39 = libCjs.isEmptyObject;
var libCjs_40 = libCjs.isHexColor;
var libCjs_41 = libCjs.isLowerCase;
var libCjs_42 = libCjs.isMobile;
var libCjs_43 = libCjs.isOSWindows;
var libCjs_44 = libCjs.isStyleUnit;
var libCjs_45 = libCjs.isTrimEmpty;
var libCjs_46 = libCjs.isUpperCase;
var libCjs_47 = libCjs.isURL;

function loadAssets(data) {
  var result = data;

  if (!libCjs_37(result)) {
    // result = require(`@/assets/${result}`)
    result = require(result);
  }

  return result;
}

var loader = /*#__PURE__*/Object.freeze({
    loadAssets: loadAssets
});

var unit = '100vw / 100'; // interface screenSize {
//   height: '100vh',
//   width: '100vw'
// }
//
// /**
//  *
//  * @param options
//  */
// export function setPageSize (options: screenSize) {
//
// }

/**
 * 获取尺寸值
 * @param val
 */

function getUnitVal(val) {
  if (val !== undefined) {
    if (typeof val === 'number') {
      // val = `calc( ${unit} * val )`
      val = val + "px";
    }
  }

  return val;
}
/**
 * 计算尺寸样式值
 * @param styles
 * @param property
 * @param val
 */

function genSize(styles, property, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    val = getUnitVal(val);
    styles[property] = val;
  }
}
/**
 * 计算样式X坐标
 * @param styles
 * @param float
 * @param val
 */

function genPosX(styles, val, float) {
  if (styles === void 0) {
    styles = {};
  }

  if (float === void 0) {
    float = false;
  }

  if (val !== undefined) {
    if (float) {
      styles['left'] = getUnitVal(val);
    } else {
      styles['marginLeft'] = getUnitVal(val);
    }
  }
}
/**
 * 计算样式Y坐标
 * @param styles
 * @param float
 * @param val
 */

function genPosY(styles, val, float) {
  if (styles === void 0) {
    styles = {};
  }

  if (float === void 0) {
    float = false;
  }

  if (val !== undefined) {
    if (float) {
      styles['top'] = getUnitVal(val);
    } else {
      styles['marginTop'] = getUnitVal(val);
    }
  }
}
/**
 * 计算背景图片样式
 * @param styles
 * @param val
 */

function genBgImg(styles, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined && val !== '') {
    styles['backgroundImage'] = "url(" + loadAssets(val) + ")";
  } else {
    styles['backgroundImage'] = 'unset';
  }
}
/**
 * 获取计算颜色样式值
 * @param styles
 * @param property
 * @param val
 */

function genColor(styles, property, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    styles[property] = val;
  }
}
/**
 * 计算浮动
 * @param styles
 * @param val
 */

function genPosition(styles, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    styles['position'] = val;
  }
}
/**
 * 计算文字溢出。。。
 * @param styles
 * @param val
 */

function genEllipsis(styles, val) {
  if (styles === void 0) {
    styles = {};
  }

  if (val !== undefined) {
    if (val === 0) {
      Object.assign(styles, {
        'overflow': 'auto',
        'text-overflow': 'normal',
        'white-space': 'normal',
        'word-break': 'normal',
        'display': 'block'
      });
    } else if (val === 1) {
      Object.assign(styles, {
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'word-break': 'normal',
        'display': '-webkit-box'
      });
    } else {
      Object.assign(styles, {
        'word-break': 'break-all',
        'text-overflow': 'clip',
        'display': '-webkit-box',
        'overflow': 'hidden',
        'word-wrap': 'break-word',
        'white-space': 'normal !important',
        '-webkit-line-clamp': val,
        '-webkit-box-orient': 'vertical'
      });
    }
  }
}
var tReg = /\$t{.+?}/g;
var pReg = /\$p{.+?}/g;
/**
 * 获取转换后的字符串值，$t{key}表示翻译值，$p{key}表示url值
 * @param $vue
 * @param value
 */

function getStrValue($vue, value) {
  var result = value;
  var tArrs = value.match(tReg);
  var pArrs = value.match(pReg);

  if (tArrs) {
    tArrs.forEach(function (item) {
      var param = item.substr(3, item.length - 4);

      if ($vue && $vue.$t) {
        result = result.replace(item, $vue.$t(param));
      } else {
        result = result.replace(item, param);
      }
    });
  }

  if (pArrs) {
    pArrs.forEach(function (item) {
      var param = item.substr(3, item.length - 4);
      result = result.replace(item, libCjs_21(param) || param);
    });
  }

  return result;
}

var index$1 = /*#__PURE__*/Object.freeze({
    unit: unit,
    getUnitVal: getUnitVal,
    genSize: genSize,
    genPosX: genPosX,
    genPosY: genPosY,
    genBgImg: genBgImg,
    genColor: genColor,
    genPosition: genPosition,
    genEllipsis: genEllipsis,
    getStrValue: getStrValue
});

var HApp =
/** @class */
function (_super) {
  __extends(HApp, _super);

  function HApp() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HApp.prototype, "styles", {
    get: function () {
      var _a = this,
          height = _a.height,
          width = _a.width,
          bgColor = _a.bgColor,
          bgImg = _a.bgImg;

      var styles = {};
      genSize(styles, 'min-height', height);
      genSize(styles, 'width', width);
      genColor(styles, 'background-color', bgColor);
      genBgImg(styles, bgImg);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: [Number, String],
    default: '100%'
  })], HApp.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: '100%'
  })], HApp.prototype, "width", void 0);

  __decorate([Prop({
    type: String,
    default: 'transparent'
  })], HApp.prototype, "bgColor", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HApp.prototype, "bgImg", void 0);

  HApp = __decorate([Component], HApp);
  return HApp;
}(Vue);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}

var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = HApp;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "h-app", style: _vm.styles },
    [
      _c("div", { staticClass: "h-app-main" }, [_vm._t("default")], 2),
      _vm._v(" "),
      _vm._t("footer")
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-091f5f95_0", { source: ".h-app {\n  min-height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  position: relative;\n}\n.h-app .h-app-main {\n    flex-grow: 1;\n    position: relative;\n}\n\n/*# sourceMappingURL=app.vue.map */", map: {"version":3,"sources":["D:\\Projects\\megmore\\packages\\megh5\\packages\\ui\\src\\app\\app.vue","app.vue"],"names":[],"mappings":"AACA;EACA,gBAAA;EACA,WAAA;EACA,aAAA;EACA,oBAAA;EACA,sBAAA;EACA,kBAAA;AAAA;AANA;IAQA,YAAA;IACA,kBAAA;AAAA;;ACCA,kCAAkC","file":"app.vue","sourcesContent":["<style lang=\"scss\">\r\n  .h-app {\r\n    min-height: 100%;\r\n    width: 100%;\r\n    display: flex;\r\n    align-items: stretch;\r\n    flex-direction: column;\r\n    position: relative;\r\n    .h-app-main {\r\n      flex-grow: 1;\r\n      position: relative;\r\n    }\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-app\" :style=\"styles\">\r\n    <div class=\"h-app-main\">\r\n      <slot></slot>\r\n    </div>\r\n    <slot name=\"footer\" />\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'\r\nimport { genSize, genColor, genBgImg } from '../core/utils'\r\n\r\n@Component\r\nexport default class HApp extends Vue {\r\n  @Prop({ type: [Number, String], default: '100%' })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: '100%' })\r\n  width!: string | number\r\n\r\n  @Prop({ type: String, default: 'transparent' })\r\n  bgColor!: string\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  get styles (): any {\r\n    const { height, width, bgColor, bgImg } = this\r\n    const styles = {}\r\n\r\n    genSize(styles, 'min-height', height)\r\n    genSize(styles, 'width', width)\r\n    genColor(styles, 'background-color', bgColor)\r\n    genBgImg(styles, bgImg)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n",".h-app {\n  min-height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: stretch;\n  flex-direction: column;\n  position: relative; }\n  .h-app .h-app-main {\n    flex-grow: 1;\n    position: relative; }\n\n/*# sourceMappingURL=app.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var HApp$1 = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

HApp$1.install = function (Vue) {
  Vue.component(HApp$1.name, HApp$1);
};

var HButton =
/** @class */
function (_super) {
  __extends(HButton, _super);

  function HButton() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  HButton.prototype.onClick = function (e) {};

  Object.defineProperty(HButton.prototype, "viewText", {
    get: function () {
      return getStrValue(this, this.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HButton.prototype, "float", {
    get: function () {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HButton.prototype, "styles", {
    get: function () {
      var _a = this,
          height = _a.height,
          width = _a.width,
          x = _a.x,
          y = _a.y,
          bgImg = _a.bgImg,
          position = _a.position,
          float = _a.float;

      var styles = {};
      genPosition(styles, position);
      genBgImg(styles, bgImg);
      genSize(styles, 'height', height);
      genSize(styles, 'width', width);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HButton.prototype, "position", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 50
  })], HButton.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HButton.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HButton.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HButton.prototype, "y", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HButton.prototype, "bgImg", void 0);

  __decorate([Prop({
    type: String,
    default: '按钮'
  })], HButton.prototype, "text", void 0);

  __decorate([Emit('click')], HButton.prototype, "onClick", null);

  HButton = __decorate([Component], HButton);
  return HButton;
}(Vue);

/* script */
const __vue_script__$1 = HButton;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "h-button", style: _vm.styles, on: { click: _vm.onClick } },
    [_vm._v("\n  " + _vm._s(_vm.text) + "\n")]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-27fc56b7_0", { source: "\n.h-button {\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n", map: {"version":3,"sources":["D:\\Projects\\megmore\\packages\\megh5\\packages\\ui\\src\\button\\button.vue"],"names":[],"mappings":";AACA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;AACA","file":"button.vue","sourcesContent":["<style>\r\n  .h-button {\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-button\"\r\n       :style=\"styles\"\r\n       @click=\"onClick\">\r\n    {{text}}\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genBgImg, genSize, genPosX, genPosY, genPosition, getStrValue } from '../core/utils'\r\nimport { positionType } from '../core/constants'\r\n\r\n@Component\r\nexport default class HButton extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: [Number, String], default: 50 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  @Prop({ type: String, default: '按钮' })\r\n  text!: string\r\n\r\n  @Emit('click')\r\n  onClick (e: Event) { }\r\n\r\n  get viewText () {\r\n    return getStrValue(this, this.text)\r\n  }\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get styles (): any {\r\n    const { height, width, x, y, bgImg, position, float } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genBgImg(styles, bgImg)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'width', width)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var HButton$1 = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

HButton$1.install = function (Vue) {
  Vue.component(HButton$1.name, HButton$1);
};

var HView =
/** @class */
function (_super) {
  __extends(HView, _super);

  function HView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HView.prototype, "float", {
    get: function () {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HView.prototype, "classes", {
    get: function () {
      var _a;

      var direction = this.direction;
      return _a = {}, _a["--direction-" + direction] = true, _a;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HView.prototype, "styles", {
    get: function () {
      var _a = this,
          float = _a.float,
          bgImg = _a.bgImg,
          height = _a.height,
          width = _a.width,
          x = _a.x,
          y = _a.y,
          position = _a.position;

      var styles = {};
      genPosition(styles, position);
      genBgImg(styles, bgImg);
      genSize(styles, 'height', height);
      genSize(styles, 'width', width);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  HView.prototype.render = function () {
    var _a = this,
        styles = _a.styles,
        $slots = _a.$slots,
        classes = _a.classes;

    return h("div", {
      "staticClass": "h-view",
      "class": classes,
      "style": styles
    }, [$slots.default]);
  };

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HView.prototype, "position", void 0);

  __decorate([Prop({
    type: String,
    default: 'y'
  })], HView.prototype, "direction", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HView.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HView.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HView.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HView.prototype, "y", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HView.prototype, "bgImg", void 0);

  HView = __decorate([Component], HView);
  return HView;
}(Vue);

/* script */
const __vue_script__$2 = HView;

/* template */

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-18c3f1e0_0", { source: ".h-view {\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: stretch;\n  position: relative;\n  flex-direction: column;\n  overflow: hidden;\n}\n.h-view.--direction-x {\n    flex-direction: row;\n    flex-wrap: wrap;\n}\n.h-view.--direction-y {\n    flex-direction: column;\n}\n\n/*# sourceMappingURL=view.vue.map */", map: {"version":3,"sources":["D:\\Projects\\megmore\\packages\\megh5\\packages\\ui\\src\\view\\view.vue","view.vue"],"names":[],"mappings":"AACA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,sBAAA;EACA,gBAAA;AAAA;AARA;IAUA,mBAAA;IACA,eAAA;AAAA;AAXA;IAcA,sBAAA;AAAA;;ACAA,mCAAmC","file":"view.vue","sourcesContent":["<style lang=\"scss\">\r\n  .h-view {\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    display: flex;\r\n    align-items: stretch;\r\n    position: relative;\r\n    flex-direction: column;\r\n    overflow: hidden;\r\n    &.--direction-x  {\r\n      flex-direction: row;\r\n      flex-wrap: wrap;\r\n    }\r\n    &.--direction-y  {\r\n      flex-direction: column;\r\n    }\r\n  }\r\n</style>\r\n<script lang=\"tsx\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject } from 'vue-property-decorator'\r\nimport { positionType } from '../core/constants'\r\nimport { genBgImg, genSize, genPosX, genPosY, genPosition } from '../core/utils'\r\n\r\n@Component\r\nexport default class HView extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: String, default: 'y' })\r\n  direction!: 'x' | 'y'\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get classes () {\r\n    const { direction } = this\r\n\r\n    return {\r\n      [`--direction-${direction}`]: true\r\n    }\r\n  }\r\n\r\n  get styles (): any {\r\n    const { float, bgImg, height, width, x, y, position } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genBgImg(styles, bgImg)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'width', width)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n\r\n    return styles\r\n  }\r\n\r\n  render () {\r\n    const { styles, $slots, classes } = this\r\n\r\n    return (\r\n      <div staticClass=\"h-view\"\r\n        class={classes}\r\n        style={styles}>\r\n        {$slots.default}\r\n      </div>\r\n    )\r\n  }\r\n}\r\n</script>\r\n",".h-view {\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: stretch;\n  position: relative;\n  flex-direction: column;\n  overflow: hidden; }\n  .h-view.--direction-x {\n    flex-direction: row;\n    flex-wrap: wrap; }\n  .h-view.--direction-y {\n    flex-direction: column; }\n\n/*# sourceMappingURL=view.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = undefined;
  /* style inject SSR */
  

  
  var HView$1 = normalizeComponent_1(
    {},
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

HView$1.install = function (Vue) {
  Vue.component(HView$1.name, HView$1);
};

var HFooter =
/** @class */
function (_super) {
  __extends(HFooter, _super);

  function HFooter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HFooter.prototype, "viewTermsText", {
    get: function () {
      return getStrValue(this, this.termsLink.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HFooter.prototype, "viewPolicyText", {
    get: function () {
      return getStrValue(this, this.policyLink.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HFooter.prototype, "viewCopyright", {
    get: function () {
      return getStrValue(this, this.copyright);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HFooter.prototype, "styles", {
    get: function () {
      var _a = this,
          height = _a.height,
          bgImg = _a.bgImg;

      var styles = {};
      genBgImg(styles, bgImg);
      genSize(styles, 'height', height);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HFooter.prototype, "height", void 0);

  __decorate([Prop({
    type: String,
    default: ''
  })], HFooter.prototype, "bgImg", void 0);

  __decorate([Prop({
    type: String
  })], HFooter.prototype, "logo", void 0);

  __decorate([Prop({
    type: Object,
    default: function () {
      return {
        text: 'Terms Of Service',
        href: ''
      };
    }
  })], HFooter.prototype, "termsLink", void 0);

  __decorate([Prop({
    type: Object,
    default: function () {
      return {
        text: 'Privacy Policy',
        href: ''
      };
    }
  })], HFooter.prototype, "policyLink", void 0);

  __decorate([Prop({
    type: String,
    default: 'Copyright 2019 * Limited All right reserved'
  })], HFooter.prototype, "copyright", void 0);

  HFooter = __decorate([Component], HFooter);
  return HFooter;
}(Vue);

/* script */
const __vue_script__$3 = HFooter;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "h-footer", style: _vm.styles }, [
    _c("div", { staticClass: "h-footer-main" }, [
      _c("img", {
        staticClass: "h-footer__logo",
        attrs: { ondragstart: "return false", src: _vm.logo, alt: "" }
      }),
      _vm._v(" "),
      _c("span", { staticClass: "h-footer__policy" }, [
        _c("a", { attrs: { href: _vm.termsLink.href } }, [
          _vm._v(_vm._s(_vm.viewTermsText))
        ]),
        _vm._v(" / "),
        _c("a", { attrs: { href: _vm.policyLink.href } }, [
          _vm._v(_vm._s(_vm.viewPolicyText))
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "h-footer__copyright" }, [
      _vm._v("\n    " + _vm._s(_vm.viewCopyright) + "\n  ")
    ])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-46200f8e_0", { source: ".h-footer {\n  width: 100%;\n  height: 100px;\n  background-color: black;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 2rem;\n  box-sizing: border-box;\n  font-size: 12px;\n}\n.h-footer .h-footer__logo {\n    user-select: none;\n    max-height: 50px;\n    max-width: 30%;\n}\n.h-footer .h-footer__copyright {\n    color: #916339;\n}\n.h-footer .h-footer-main {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    color: #cf9159;\n}\n.h-footer a {\n    text-decoration: none;\n    outline: none;\n    color: inherit;\n}\n\n/*# sourceMappingURL=footer.vue.map */", map: {"version":3,"sources":["D:\\Projects\\megmore\\packages\\megh5\\packages\\ui\\src\\footer\\footer.vue","footer.vue"],"names":[],"mappings":"AAGA;EACA,WAAA;EACA,aAJA;EAKA,uBAAA;EACA,YAAA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;AAAA;AAVA;IAYA,iBAAA;IACA,gBAdA;IAeA,cAAA;AAAA;AAdA;IAiBA,cACA;AAAA;AAlBA;IAoBA,aAAA;IACA,mBAAA;IACA,8BAAA;IACA,cAAA;AAAA;AAvBA;IA0BA,qBAAA;IACA,aAAA;IACA,cAAA;AAAA;;ACJA,qCAAqC","file":"footer.vue","sourcesContent":["<style lang=\"scss\">\r\n  $--footer-size: 100px;\r\n  $--footer-logo-size: 50px;\r\n  .h-footer {\r\n    width: 100%;\r\n    height: $--footer-size;\r\n    background-color: black;\r\n    color: white;\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    padding: 2rem;\r\n    box-sizing: border-box;\r\n    font-size: 12px;\r\n    .h-footer__logo {\r\n      user-select: none;\r\n      max-height: $--footer-logo-size;\r\n      max-width: 30%;\r\n    }\r\n    .h-footer__copyright {\r\n      color: #916339\r\n    }\r\n    .h-footer-main {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      color: #cf9159;\r\n    }\r\n    a {\r\n      text-decoration:none;\r\n      outline: none;\r\n      color: inherit;\r\n    }\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-footer\" :style=\"styles\">\r\n    <div class=\"h-footer-main\">\r\n      <img class=\"h-footer__logo\" ondragstart=\"return false\" :src=\"logo\" alt=\"\" />\r\n      <span class=\"h-footer__policy\">\r\n        <a :href=\"termsLink.href\">{{viewTermsText}}</a> / <a :href=\"policyLink.href\">{{viewPolicyText}}</a>\r\n      </span>\r\n    </div>\r\n    <div class=\"h-footer__copyright\">\r\n      {{viewCopyright}}\r\n    </div>\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genBgImg, genSize, getStrValue } from '../core/utils'\r\nimport { PropTypeLink } from '../core/constants'\r\n\r\n@Component\r\nexport default class HFooter extends Vue {\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: String, default: '' })\r\n  bgImg!: string\r\n\r\n  @Prop({ type: String })\r\n  logo!: string\r\n\r\n  @Prop({ type: Object, default: () => ({ text: 'Terms Of Service', href: '' }) })\r\n  termsLink!: PropTypeLink\r\n\r\n  @Prop({ type: Object, default: () => ({ text: 'Privacy Policy', href: '' }) })\r\n  policyLink!: PropTypeLink\r\n\r\n  @Prop({ type: String, default: 'Copyright 2019 * Limited All right reserved' })\r\n  copyright!: string\r\n\r\n  get viewTermsText () {\r\n    return getStrValue(this, this.termsLink.text)\r\n  }\r\n\r\n  get viewPolicyText () {\r\n    return getStrValue(this, this.policyLink.text)\r\n  }\r\n\r\n  get viewCopyright () {\r\n    return getStrValue(this, this.copyright)\r\n  }\r\n\r\n  get styles (): any {\r\n    const { height, bgImg } = this\r\n    const styles = {}\r\n\r\n    genBgImg(styles, bgImg)\r\n    genSize(styles, 'height', height)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n",".h-footer {\n  width: 100%;\n  height: 100px;\n  background-color: black;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 2rem;\n  box-sizing: border-box;\n  font-size: 12px; }\n  .h-footer .h-footer__logo {\n    user-select: none;\n    max-height: 50px;\n    max-width: 30%; }\n  .h-footer .h-footer__copyright {\n    color: #916339; }\n  .h-footer .h-footer-main {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    color: #cf9159; }\n  .h-footer a {\n    text-decoration: none;\n    outline: none;\n    color: inherit; }\n\n/*# sourceMappingURL=footer.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var HFooter$1 = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );

HFooter$1.install = function (Vue) {
  Vue.component(HFooter$1.name, HFooter$1);
};

var GIFT = 'data:image/png;base64,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';
var BG = 'data:image/png;base64,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';

var HPromoCode =
/** @class */
function (_super) {
  __extends(HPromoCode, _super);

  function HPromoCode() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HPromoCode.prototype, "viewLabel", {
    get: function () {
      return getStrValue(this, this.label);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HPromoCode.prototype, "viewCode", {
    get: function () {
      return getStrValue(this, this.code);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HPromoCode.prototype, "float", {
    get: function () {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HPromoCode.prototype, "styles", {
    get: function () {
      var _a = this,
          bgImg = _a.bgImg,
          x = _a.x,
          y = _a.y,
          height = _a.height,
          width = _a.width,
          float = _a.float,
          position = _a.position;

      var styles = {};
      genPosition(styles, position);
      genBgImg(styles, bgImg);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      genSize(styles, 'height', height);
      genSize(styles, 'width', width);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HPromoCode.prototype, "position", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: '100%'
  })], HPromoCode.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HPromoCode.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HPromoCode.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HPromoCode.prototype, "y", void 0);

  __decorate([Prop({
    type: String,
    default: 'Code'
  })], HPromoCode.prototype, "label", void 0);

  __decorate([Prop({
    type: String,
    default: '10086'
  })], HPromoCode.prototype, "code", void 0);

  __decorate([Prop({
    type: String,
    default: GIFT
  })], HPromoCode.prototype, "gift", void 0);

  __decorate([Prop({
    type: String,
    default: BG
  })], HPromoCode.prototype, "bgImg", void 0);

  HPromoCode = __decorate([Component], HPromoCode);
  return HPromoCode;
}(Vue);

/* script */
const __vue_script__$4 = HPromoCode;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "h-promo-code", style: _vm.styles }, [
    _c("div", { staticClass: "h-promo-code-label" }, [
      _c("img", {
        staticClass: "h-promo-code__gift",
        attrs: { ondragstart: "return false", src: _vm.gift, alt: "" }
      }),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.viewLabel))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "h-promo-code__codes" }, [
      _vm._v("\n    " + _vm._s(_vm.viewCode) + "\n  ")
    ])
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-28318da4_0", { source: ".h-promo-code {\n  width: auto;\n  height: 100px;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 20px;\n  box-sizing: border-box;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n}\n.h-promo-code .h-promo-code__codes {\n    flex-grow: 1;\n    font-weight: 700;\n    font-size: 20px;\n    overflow-x: auto;\n    color: #ff5a00;\n    margin: 0 .5rem;\n}\n.h-promo-code .h-promo-code-label {\n    display: flex;\n    align-items: center;\n    color: #d6c29b;\n    font-size: 16px;\n}\n.h-promo-code .h-promo-code__gift {\n    height: 50px;\n    width: 50px;\n}\n\n/*# sourceMappingURL=promo-code.vue.map */", map: {"version":3,"sources":["D:\\Projects\\megmore\\packages\\megh5\\packages\\ui\\src\\promo-code\\promo-code.vue","promo-code.vue"],"names":[],"mappings":"AAGA;EACA,WAAA;EACA,aAJA;EAKA,YAAA;EACA,2BAAA;EACA,0BAAA;EACA,4BAAA;EACA,aAAA;EACA,sBAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;AAAA;AAXA;IAaA,YAAA;IACA,gBAAA;IACA,eAAA;IACA,gBAAA;IACA,cAAA;IACA,eAAA;AAAA;AAlBA;IAqBA,aAAA;IACA,mBAAA;IACA,cAAA;IACA,eAAA;AAAA;AAxBA;IA2BA,YAAA;IACA,WAAA;AAAA;;ACHA,yCAAyC","file":"promo-code.vue","sourcesContent":["<style lang=\"scss\">\r\n  $--footer-size: 100px;\r\n  $--footer-logo-size: 50px;\r\n  .h-promo-code {\r\n    width: auto;\r\n    height: $--footer-size;\r\n    color: white;\r\n    background-position: center;\r\n    background-size: 100% 100%;\r\n    background-repeat: no-repeat;\r\n    padding: 20px;\r\n    box-sizing: border-box;\r\n    font-size: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    .h-promo-code__codes {\r\n      flex-grow: 1;\r\n      font-weight: 700;\r\n      font-size: 20px;\r\n      overflow-x: auto;\r\n      color: #ff5a00;\r\n      margin: 0 .5rem;\r\n    }\r\n    .h-promo-code-label {\r\n      display: flex;\r\n      align-items: center;\r\n      color: #d6c29b;\r\n      font-size: 16px;\r\n    }\r\n    .h-promo-code__gift {\r\n      height: 50px;\r\n      width: 50px;\r\n    }\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-promo-code\" :style=\"styles\">\r\n    <div class=\"h-promo-code-label\">\r\n      <img class=\"h-promo-code__gift\" ondragstart=\"return false\" :src=\"gift\" alt=\"\" />\r\n      <span>{{viewLabel}}</span>\r\n    </div>\r\n    <div class=\"h-promo-code__codes\">\r\n      {{viewCode}}\r\n    </div>\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genBgImg, genPosX, genPosY, genSize, getStrValue, genPosition } from '../core/utils'\r\nimport { positionType } from '../core/constants'\r\n\r\nconst GIFT = 'data:image/png;base64,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'\r\nconst BG = 'data:image/png;base64,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'\r\n\r\n@Component\r\nexport default class HPromoCode extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: [Number, String], default: '100%' })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: String, default: 'Code' })\r\n  label!: string\r\n\r\n  @Prop({ type: String, default: '10086' })\r\n  code!: string\r\n\r\n  @Prop({\r\n    type: String,\r\n    default: GIFT\r\n  })\r\n  gift!: string\r\n\r\n  @Prop({\r\n    type: String,\r\n    default: BG\r\n  })\r\n  bgImg!: string\r\n\r\n  get viewLabel () {\r\n    return getStrValue(this, this.label)\r\n  }\r\n\r\n  get viewCode () {\r\n    return getStrValue(this, this.code)\r\n  }\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get styles (): any {\r\n    const { bgImg, x, y, height, width, float, position } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genBgImg(styles, bgImg)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'width', width)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n",".h-promo-code {\n  width: auto;\n  height: 100px;\n  color: white;\n  background-position: center;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  padding: 20px;\n  box-sizing: border-box;\n  font-size: 12px;\n  display: flex;\n  align-items: center; }\n  .h-promo-code .h-promo-code__codes {\n    flex-grow: 1;\n    font-weight: 700;\n    font-size: 20px;\n    overflow-x: auto;\n    color: #ff5a00;\n    margin: 0 .5rem; }\n  .h-promo-code .h-promo-code-label {\n    display: flex;\n    align-items: center;\n    color: #d6c29b;\n    font-size: 16px; }\n  .h-promo-code .h-promo-code__gift {\n    height: 50px;\n    width: 50px; }\n\n/*# sourceMappingURL=promo-code.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  

  
  var HPromoCode$1 = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    browser,
    undefined
  );

HPromoCode$1.install = function (Vue) {
  Vue.component(HPromoCode$1.name, HPromoCode$1);
};

var HText =
/** @class */
function (_super) {
  __extends(HText, _super);

  function HText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HText.prototype, "viewText", {
    get: function () {
      return getStrValue(this, this.text);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HText.prototype, "float", {
    get: function () {
      return this.position !== 'relative';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HText.prototype, "styles", {
    get: function () {
      var _a = this,
          height = _a.height,
          width = _a.width,
          ellipsis = _a.ellipsis,
          fontSize = _a.fontSize,
          position = _a.position,
          x = _a.x,
          y = _a.y,
          float = _a.float;

      var styles = {};
      genPosition(styles, position);
      genEllipsis(styles, ellipsis);
      genSize(styles, 'width', width);
      genSize(styles, 'height', height);
      genSize(styles, 'fontSize', fontSize);
      genPosX(styles, x, float);
      genPosY(styles, y, float);
      return styles;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    default: 'relative'
  })], HText.prototype, "position", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 50
  })], HText.prototype, "height", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 100
  })], HText.prototype, "width", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 12
  })], HText.prototype, "fontSize", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HText.prototype, "x", void 0);

  __decorate([Prop({
    type: [Number, String],
    default: 0
  })], HText.prototype, "y", void 0);

  __decorate([Prop({
    type: Number,
    default: 0
  })], HText.prototype, "ellipsis", void 0);

  __decorate([Prop({
    type: String,
    default: '内容'
  })], HText.prototype, "text", void 0);

  HText = __decorate([Component], HText);
  return HText;
}(Vue);

/* script */
const __vue_script__$5 = HText;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "h-text", style: _vm.styles }, [
    _vm._v("\n  " + _vm._s(_vm.viewText) + "\n")
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-73da2d81_0", { source: ".h-text[data-v-73da2d81] {\n  background-repeat: no-repeat;\n}\n\n/*# sourceMappingURL=text.vue.map */", map: {"version":3,"sources":["D:\\Projects\\megmore\\packages\\megh5\\packages\\ui\\src\\text\\text.vue","text.vue"],"names":[],"mappings":"AACA;EACA,4BAAA;AAAA;;ACCA,mCAAmC","file":"text.vue","sourcesContent":["<style lang=\"scss\" scoped>\r\n  .h-text {\r\n    background-repeat: no-repeat;\r\n  }\r\n</style>\r\n<template>\r\n  <div class=\"h-text\" :style=\"styles\">\r\n    {{viewText}}\r\n  </div>\r\n</template>\r\n<script lang=\"ts\">\r\nimport { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'\r\nimport { genSize, genEllipsis, getStrValue, genPosition, genPosX, genPosY } from '../core/utils'\r\nimport { positionType } from '../core/constants'\r\n\r\n@Component\r\nexport default class HText extends Vue {\r\n  @Prop({ type: String, default: 'relative' })\r\n  position!: positionType\r\n\r\n  @Prop({ type: [Number, String], default: 50 })\r\n  height!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 100 })\r\n  width!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 12 })\r\n  fontSize!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  x!: string | number\r\n\r\n  @Prop({ type: [Number, String], default: 0 })\r\n  y!: string | number\r\n\r\n  @Prop({ type: Number, default: 0 })\r\n  ellipsis!: number\r\n\r\n  @Prop({ type: String, default: '内容' })\r\n  text!: string\r\n\r\n  get viewText () {\r\n    return getStrValue(this, this.text)\r\n  }\r\n\r\n  get float (): boolean {\r\n    return this.position !== 'relative'\r\n  }\r\n\r\n  get styles (): any {\r\n    const { height, width, ellipsis, fontSize, position, x, y, float } = this\r\n    const styles = {}\r\n\r\n    genPosition(styles, position)\r\n    genEllipsis(styles, ellipsis)\r\n    genSize(styles, 'width', width)\r\n    genSize(styles, 'height', height)\r\n    genSize(styles, 'fontSize', fontSize)\r\n    genPosX(styles, x, float)\r\n    genPosY(styles, y, float)\r\n\r\n    return styles\r\n  }\r\n}\r\n</script>\r\n",".h-text {\n  background-repeat: no-repeat; }\n\n/*# sourceMappingURL=text.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-73da2d81";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  

  
  var HText$1 = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    browser,
    undefined
  );

HText$1.install = function (Vue) {
  Vue.component(HText$1.name, HText$1);
};



var components = /*#__PURE__*/Object.freeze({
    HApp: HApp$1,
    HButton: HButton$1,
    HView: HView$1,
    HFooter: HFooter$1,
    HPromoCode: HPromoCode$1,
    Text: HText$1
});

var Mode;

(function (Mode) {
  Mode["light"] = "light";
  Mode["night"] = "night";
})(Mode || (Mode = {}));

var UiMode;

(function (UiMode) {
  UiMode["x"] = "x";
  UiMode["y"] = "y";
  UiMode["xy"] = "xy";
  UiMode["none"] = "none";
})(UiMode || (UiMode = {}));

var index$2 = /*#__PURE__*/Object.freeze({
    get Mode () { return Mode; },
    get UiMode () { return UiMode; }
});

var MegH5 = {
  installed: false,
  install: function (Vue, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (MegH5.installed) {
      return;
    }

    MegH5.installed = true;
    var componentsList = opts.components || components;
    Object.values(componentsList).forEach(function (entry) {
      Vue.use(entry);
    });
  },
  version: '1.0.0'
};

exports.Constants = index$2;
exports.HApp = HApp$1;
exports.HButton = HButton$1;
exports.HFooter = HFooter$1;
exports.HPromoCode = HPromoCode$1;
exports.HView = HView$1;
exports.Loader = loader;
exports.Text = HText$1;
exports.Utils = index$1;
exports.default = MegH5;
