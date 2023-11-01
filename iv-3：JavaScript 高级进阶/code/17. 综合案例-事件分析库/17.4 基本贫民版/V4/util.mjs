const hasOwnP = Object.prototype.hasOwnProperty;


export function hasOwnProperty(obj, property) {
    if (!isObject(obj)) {
        return false;
    }
    return hasOwnP.call(obj, property);
}


/**
 * 创建纯净对象
 * @returns 
 */
export function createPureObject(obj = undefined) {

    const pObj = Object.create(null);
    if(!isObject(obj)){
        return pObj;
    }

    return Object.assign(pObj, obj)
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
            // 因为执行过程中能失败，所以callback后置执行
            const result = Reflect.apply(...arguments);
            callback(...[ctx].concat(args));
            return result;
        }
    }
}

export function isFunction(fn) {
    return typeof fn === 'function'
}

export function isObject(obj){
    return typeof obj === "object"
}

export function isSameStringifyObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export function isSameFunction(fn1, fn2, compareContent = false) {

    if (!isFunction(fn1) || !isFunction(fn2)) {
        return false;
    }

    if (fn1.length !== fn2.length) {
        return false;
    }

    if (fn1.name !== fn2.name) {
        return false;
    }

    if (!compareContent) {
        return fn1 === fn2;
    }

    return fn1 === fn2 || fn1.toString() === fn2.toString();
}

export function booleanFalse() {
    return false;
}

export function booleanTrue() {
    return true;
}


/**
 * 忽略 signal属性 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
 * @param option 
 */
export function copyListenerOption(option) {
    if (typeof option !== "object") {
        return option;
    }
    const opt = {
        ...option
    }
    delete opt.signal
    return opt;
}


export function delay(fn = () => { }, delay = 5000, context = null) {
    let ticket = null;
    let runned = false;
    return {
        run(...args) {
            return new Promise((resolve, reject) => {
                if (runned === true) {
                    return;
                }
                runned = true;
                ticket = setTimeout(async () => {
                    try {
                        const res = await fn.apply(context, args);
                        resolve(res);
                    } catch (err) {
                        reject(err)
                    }
                }, delay)
            })
        },
        cancel: () => {
            clearTimeout(ticket);
        }
    }
}
