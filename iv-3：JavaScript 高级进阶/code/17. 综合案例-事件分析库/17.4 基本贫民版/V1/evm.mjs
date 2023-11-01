

// 保留原始的原型
const orgEventTargetPro = { ...EventTarget.prototype };

const ep = EventTarget.prototype;

// Proxy.revocable返回值
let rvAdd, rvRemove;

// 是否已监听
let isWatched = false;
// 默认的回调
let _callback = () => { };

/**
 * 
 * 创建可撤销的代理对象
 * @param {any} obj 
 * @param {any} handler 
 * @returns 
 */
function createRevocableProxy(obj, handler) {
    return Proxy.revocable(obj, handler);
}

/**
 * 
 * 创建代理处理函数
 * @param {any} callback 
 * @returns 
 */
function createApplyHandler(callback) {
    return {
        //对函数进行拦截
        apply(target, ctx, args) {
            callback(...[ctx].concat(args));
            return Reflect.apply(...arguments);
        }
    }
}

/**
 * 
 * 观察方法
 * @export
 * @param {any} [addCallback=_callback] 
 * @param {any} [removeCallback=_callback] 
 * @returns 
 */
export function watch(addCallback = _callback, removeCallback = _callback) {

    function innerAddCallback() {
        addCallback(...arguments);
    }

    function innerRemoveCallback() {
        removeCallback(...arguments);
    }

    if (isWatched) {
        return;
    }

    //创建可撤销代理，监听事件添加
    rvAdd = createRevocableProxy(ep.addEventListener, createApplyHandler(innerAddCallback));
    ep.addEventListener = rvAdd.proxy;

    //创建可撤销代理，监听事件移除
    rvRemove = createRevocableProxy(ep.removeEventListener, createApplyHandler(innerRemoveCallback));
    ep.removeEventListener = rvRemove.proxy;
}

export function cancelWatch() {
    //撤销添加事件的代理对象
    rvAdd.revoke();
    //撤销移除事件的代理对象
    rvRemove.revoke();
    //还原
    ep.addEventListener = orgEventTargetPro.addEventListener;
    ep.removeEventListener = orgEventTargetPro.removeEventListener;
}

