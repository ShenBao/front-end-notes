import { TypeListenerOptions } from "./types";

const hasOwnP = Object.prototype.hasOwnProperty;
const NATIVE_CODE_ANONYMOUS_FUN = "function () { [native code] }";
const NATIVE_CODE_CON = `{ [native code] }`;

/**
 * 是否有某属性
 * @param obj 
 * @param property 
 * @returns 
 */
export function hasOwnProperty(obj: unknown, property: string): boolean {
    if (!isObject(obj)) {
        return false;
    }
    return hasOwnP.call(obj, property);
}

/**
 * 创建纯净对象
 * @returns 
 */
export function createPureObject(obj: unknown = undefined): object {

    const pObj = Object.create(null);
    if (!isObject(obj)) {
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
export function createRevocableProxy(obj: object | Function, handler: any) {
    return Proxy.revocable(obj, handler);
}

/**
 * 创建拦截函数调用的代理
 * @param callback 
 * @returns 
 */
export function createApplyHandler(callback: Function) {
    return {
        apply(target: Function, ctx: object, args: unknown[]) {
            // 因为执行过程中能失败，所以callback后置执行
            const result = Reflect.apply(target, ctx, args);
            callback(...[ctx].concat(args));
            return result;
        }
    }
}

export function isFunction(fn: Function): boolean {
    return typeof fn === 'function'
}

export function isBoolean(obj: any) {
    return typeof obj === "boolean";
}

export function isObject(obj: unknown): boolean {
    return obj !== null && typeof obj === 'object';
}

export function isSameStringifyObject(obj1: unknown, obj2: unknown) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

/**
 * 是否是同一函数
 * @param fn1 
 * @param fn2 
 * @param compareContent 
 * @returns 
 */
export function isSameFunction(fn1: Function | undefined | null, fn2: Function | undefined | null, compareContent = false) {

    if (fn1 == undefined || fn2 == undefined) {
        return false;
    }

    if (!isFunction(fn1) || !isFunction(fn2)) {
        return false;
    }

    if (fn1.length !== fn2.length) {
        return false;
    }

    // if (fn1.name !== fn2.name) {
    //     return false;
    // }

    if (!compareContent) {
        return fn1 === fn2;
    }

    return fn1 === fn2 || isSameContentFunction(fn1, fn2);
}

function isSameContentFunction(fn1: Function, fn2: Function) {
    if (!isFunction(fn1) || !isFunction(fn2)) {
        return false;
    }
    const fn1Content = getFunctionContent(fn1);
    const fn2Content = getFunctionContent(fn2);

    if (isBuiltinFunctionContent(fn1Content) || isBuiltinFunctionContent(fn2Content)) {
        return false;
    }
    return fn1Content == fn2Content;
}



/**
 * 获取函数体
 * @param fn 
 * @returns 
 */
export function getFunctionContent(fn: Function) {
    const content = fn.toString();
    if (content == NATIVE_CODE_ANONYMOUS_FUN) {
        return NATIVE_CODE_ANONYMOUS_FUN.slice(11);
    }
    // TODO:: 特殊函数名处理
    // const startIndex = `function ${fn.name}()`.length;
    // return content.slice(startIndex)
    const index = content.indexOf("{");
    return content.slice(index);
}

export function isBuiltinFunctionContent(content: string): boolean {
    return content.trim() == NATIVE_CODE_CON;
}

// https://stackoverflow.com/questions/35686850/determine-if-a-javascript-function-is-a-bound-function
export function isBoundFunction(fn: Function): boolean {
    return fn.name.startsWith('bound ') && !fn.hasOwnProperty('prototype');
}

export function booleanFalse(): boolean {
    return false;
}

export function booleanTrue(): boolean {
    return true;
}


/**
 * 忽略 signal属性 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
 * 忽略对象属性 
 * TODO:: improve
 * @param option 
 */
export function copyListenerOption<T = any>(options: T) {
    if (typeof options !== "object") {
        return options;
    }


    const result = createPureObject();
    let v;
    for (let p in options) {

        // TODO::  improve 
        if (typeof p !== "string" || typeof p !== "number") {
            continue;
        }

        if (!hasOwnProperty(options, p)) {
            continue;
        }
        v = options[p];
        if (isObject(v)) {
            continue;
        }
        result[p] = v;
    }
    return result;
}


/**
 * 延时执行函数
 * @param fn 
 * @param delay 
 * @param context 
 * @returns 
 */
export function delay(fn: Function = () => { }, delay: number = 5000, context: unknown = null): {
    run: (...args: any[]) => Promise<any>,
    cancel: () => void
} {
    if (!isFunction(fn)) {
        return {
            run: () => Promise.resolve(),
            cancel: () => { }
        }
    }
    let ticket: any;
    let executed = false;
    return {
        run(...args: any[]) {
            return new Promise((resolve, reject) => {
                if (executed === true) {
                    return;
                }
                executed = true;
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


export function createFunProxy(oriFun: Function, callback: Function) {
    if (!isFunction(oriFun)) {
        throw new Error("createFunProxy:: oriFun should be a function");
    }
    const rProxy = createRevocableProxy(oriFun,
        createApplyHandler(callback));

    return rProxy;
}



/**
 * 检查属性，并产生代理
 * @param prototype 
 * @param callback 
 * @param ckProperties 
 * @param proxyProperties 
 * @returns 
 */
export function checkAndProxy(prototype: any, callback: Function, ckProperties: string[], proxyProperties: string[] = ckProperties) {
    let fn;
    const proto = prototype

    // 检查方法
    for (let i = 0; i < ckProperties.length; i++) {
        if (!hasOwnProperty(proto, ckProperties[i])) {
            continue;
        }
        fn = proto[ckProperties[i]];
        if (isFunction(fn)) {
            break;
        }

    }

    if (!isFunction(fn)) {
        return null;
    }

    const rpProxy = createFunProxy(fn, callback);
    if (!rpProxy) {
        return null;
    }

    // 替换方法
    proxyProperties.forEach(pname => {
        if (hasOwnProperty(proto, pname) && isFunction(proto[pname])) {
            proto[pname] = rpProxy.proxy
        }
    })

    return rpProxy;
}

/**
 * 还原属性方法
 * @param prototype 
 * @param orPrototype 
 * @param properties 
 */
export function restoreProperties(prototype: any, orPrototype: any, properties: string[]): void {
    const proto = prototype;
    const oriProto = orPrototype;

    properties.forEach(pname => {
        if (hasOwnProperty(proto, pname) && isFunction(proto[pname])) {
            prototype[pname] = oriProto[pname]
        }
    })
}



/**
 * 获取
 */
function getAddEventListenerOptions(options: boolean | AddEventListenerOptions): AddEventListenerOptions {
    // 未定义
    if (options === undefined) {
        return {
            capture: false
        }
    }

    if (isBoolean(options)) {
        return {
            capture: options as boolean
        }
    }

    if (isObject(options)) {
        return options as AddEventListenerOptions
    }

    return {
        capture: false
    }

}


/**
 * EventTarget的addEventListener, removeEventListener的第三个参数options是否相同的判断
 * @param options1 
 * @param options2 
 */
export function isSameETOptions(options1: boolean | AddEventListenerOptions = {
    capture: false
}, options2: boolean | AddEventListenerOptions = {
    capture: false
}): boolean {

    const opt1 = getAddEventListenerOptions(options1);
    const opt2 = getAddEventListenerOptions(options2);
    return opt1.capture === opt2.capture;
}

export function isStrict(this: any) {
    return this === undefined;
};

const regexpUseStrict = /^function[^(]*\([^)]*\)\s*\{\s*(["'])use strict\1/
export function isFunctionStrict(fn: Function) {
    return regexpUseStrict.test(fn.toString())
}

export function getStack(fn: Function): string[] {
    const stacks: string[] = [];

    // 严格模式
    if (isStrict() || isFunctionStrict(fn)) {
        return stacks;
    }
    stacks.unshift(`function ${fn.name}`);
    let caller = fn.caller;
    while (caller) {
        stacks.unshift(`function ${caller.name}`);
        caller = caller.caller;
    }
    return stacks;
}


export async function executeGC() {
    var globalThat = globalThis as any;
    if (typeof globalThat !== 'undefined' && isFunction(globalThat.gc)) {
        globalThat.gc();
    }
    // 如果没有gc方法，延时1秒
    const { run } = delay(undefined, 1000);
    await run();
}