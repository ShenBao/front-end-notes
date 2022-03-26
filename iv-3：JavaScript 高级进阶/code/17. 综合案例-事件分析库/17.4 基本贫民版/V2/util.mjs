
/**
 * 创建纯净对象
 * @returns 
 */
export function createPureObject() {
    return Object.create(null);
}

/**
 * 创建可取消的代理
 * @param obj 
 * @param handler 
 * @returns 
 */
export function createRevocableProxy(obj, handler) {
    return Proxy.revocable(obj, handler);
}

/**
 * 创建拦截函数调用的代理
 * @param callback 
 * @returns 
 */
export function createApplyHandler(callback) {
    return {
        apply(target, ctx, args) {
            callback(...[ctx].concat(args));
            return Reflect.apply(...arguments);
        }
    }
}

export function isFunction(fn) {
    return typeof fn === 'function'
}

/**
 * 
 * 判断两个对象是否相同
 * @export
 * @param {any} obj1 
 * @param {any} obj2 
 * @returns 
 */
export function isSameStringifyObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

/**
 * 
 * 判断是否是相同的函数
 * @export
 * @param {any} fn1 
 * @param {any} fn2 
 * @param {boolean} [compareContent=false] 
 * @returns 
 */
export function isSameFunction(fn1, fn2, compareContent = false) {

    if (!isFunction(fn1) || !isFunction(fn2)) {
        return false;
    }

    if (!compareContent) {
        return fn1 === fn2;
    }

    return fn1 === fn2 || fn1.toString() === fn2.toString();
}

/**
 * 
 * 默认白名单
 * @export
 * @returns 
 */
export function booleanFalse() {
    return false;
}