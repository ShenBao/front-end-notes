const { DEFAULT_ERROR_CATCH_OPTIONS } = require("../Const");

const { defineProperty, getPrototypeOf } = Object;


const asyncFnConstructor = (async function () { }).constructor;

// options类型白名单
const W_TYPES = ["string", "object"];

function getOptions(options) {
    const type = typeof options;

    let opt;

    if (options == null || !W_TYPES.includes(type)) { // null 或者 不是字符串或者对象
        opt = DEFAULT_ERROR_CATCH_OPTIONS;
    } else if (typeof options === "string") { // 字符串
        opt = {
            ...DEFAULT_ERROR_CATCH_OPTIONS,
            message: options || DEFAULT_ERROR_CATCH_OPTIONS.message,
        };
    } else { // 有效的对象
        opt = { ...DEFAULT_ERROR_CATCH_OPTIONS, ...options };
    }

    return opt;
}

/**
 * 
 * 异步函数处理
 * @export
 * @param {AnyFunction} fn 
 * @param {*} context 
 * @param {ErrorHandler} callback 
 * @returns 
 */
function observerAsyncHandler(fn, context, callback) {
    return async function (...args) {
        try {
            const r = await fn.call(context || this, ...args);
            return r;
        } catch (err) {
            callback(err);
        }
    };
}



/**
 * 同步函数处理
 * @param {AnyFunction} fn 
 * @param {*} context 
 * @param {ErrorHandler} callback 
 * @returns 
 */
function observerSyncHandler(fn, context, callback) {
    return function (...args) {
        try {
            const r = fn.call(context || this, ...args);
            return r;
        } catch (err) {
            callback(err);
        }
    };
}

/**
 * 
 * 自动识别同步还是异步方法
 * @param {any} fn 
 * @param {any} context 
 * @param {any} callback 
 * @returns 
 */
function observerAllHandler(fn, context, callback) {
    //AsyncGeneratorFunction 和  AsyncFunction
    if (fn.constructor.name.startsWith("Async")) {
        return observerAsyncHandler(fn, context, callback);
    }
    return observerSyncHandler(fn, context, callback);
}

/**
 *
 * @param err 默认的错误处理函数
 * @param options
 */
function defaultErrorHandler(err, options) {
    const message = err.message || options.message;
    console.error("defaultErrorHandler:", message, "==toast==", options.message, "==errInfo=", /*err*/);
}

/**
 * class { method(){} }
 * @param {string | CatchOptions} options
 * @param handler
 * @returns
 */
function catchMethod(options = DEFAULT_ERROR_CATCH_OPTIONS, handler = defaultErrorHandler) {
    const opt = getOptions(options);

    return function (_target, _name, descriptor) {
        const oldFn = descriptor.value;

        Object.defineProperty(descriptor, "value", {
            get() {
                const proxy = observerAllHandler(oldFn, undefined, (error) => {
                    handler(error, opt);
                });
                proxy._bound = true;
                return proxy;
            }
        });
        // return descriptor;
    };
}

/**
 * class {  get method(){} }
 * @param options
 * @param handler
 * @returns
 */
function catchGetter(options = DEFAULT_ERROR_CATCH_OPTIONS, handler = defaultErrorHandler) {
    const opt = getOptions(options);

    return function (_target, _name, descriptor) {
        const { constructor } = _target;
        const { get: oldFn } = descriptor;

        defineProperty(descriptor, "get", {
            value() {
                // Class.prototype.key lookup
                // Someone accesses the property directly on the prototype on which it is
                // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
                if (this === _target) {
                    return oldFn();
                }
                // Class.prototype.key lookup
                // Someone accesses the property directly on a prototype but it was found
                // up the chain, not defined directly on it
                // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
                if (
                    this.constructor !== constructor &&
                    getPrototypeOf(this).constructor === constructor
                ) {
                    return oldFn();
                }
                const boundFn = observerAllHandler(oldFn, this, (error) => {
                    handler(error, opt);
                });
                boundFn._bound = true;

                return boundFn();
            }
        });

        return descriptor;
    };
}

/**
 * // class A{ method = ()=>{} }
 * @param options
 * @param handler
 */
function catchInitializer(options = DEFAULT_ERROR_CATCH_OPTIONS, handler = defaultErrorHandler) {
    const opt = getOptions(options);

    return function (_target, _name, descriptor) {
        const initValue = descriptor.initializer();
        if (typeof initValue !== "function") {
            return descriptor;
        }

        descriptor.initializer = function () {
            initValue.bound = true;
            return observerAllHandler(initValue, this, (error) => {
                handler(error, opt);
            });
        };
        return descriptor;
    };
}

function createErrorCatch(handler, baseOptions = DEFAULT_ERROR_CATCH_OPTIONS) {
    return {
        catchMethod(options) {
            return catchMethod({ ...baseOptions, ...getOptions(options) }, handler);
        },
        catchGetter(options) {
            return catchGetter({ ...baseOptions, ...getOptions(options) }, handler);
        },
        catchInitializer(options) {
            return catchInitializer({ ...baseOptions, ...getOptions(options) }, handler);
        }
    };
}


module.exports = {
    getOptions,
    catchMethod,
    catchGetter,
    catchInitializer,
    createErrorCatch
}