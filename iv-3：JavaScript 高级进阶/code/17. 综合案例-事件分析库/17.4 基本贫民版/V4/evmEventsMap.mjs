import { createPureObject, isSameStringifyObject, copyListenerOption, isSameFunction } from "./util.mjs"

export default class EvmEventsMap {

    #map = new Map();

    /**
     * 
     * @param target  Node节点
     * @returns 
     */
    getKeyFromTarget(target) {
        const keys = this.keys();

        const index = keys.findIndex(wrKey => {
            const key = wrKey.deref();
            if (!key) return false;
            return key === target;
        });

        return keys[index];
    }

    keys() {
        return [...this.#map.keys()];
    }

    /**
     * 添加
     * @param target Node节点或者 WeakRef(Node)
     * @param event 事件类型，比如click, resize等
     * @param listener 事件处理程序
     */
    addListener(target, event, listener, options) {

        const map = this.#map;

        let t;
        // target 如果是 WeakRef, 直接使用
        let wrTarget = target instanceof WeakRef ? target : this.getKeyFromTarget(target);


        if (!wrTarget) {
            wrTarget = new WeakRef(target);
        }
        t = this.#map.get(wrTarget);
        if (!t) {
            t = createPureObject();
            map.set(wrTarget, t);
        }
        if (!t[event]) {
            t[event] = [];
        }
        t[event].push({
            listener: new WeakRef(listener),
            options: copyListenerOption(options)
        });
        return this;
    }

    /**
     * 删除
     * @param target Node节点或者 WeakRef(Node)
     * @param event 事件类型，比如click, resize等
     * @param listener 事件处理程序
     * @returns undefined
     */
    removeListener(target, event, listener, options) {
        const map = this.#map;

        let wrTarget = target instanceof WeakRef ? target : this.getKeyFromTarget(target);
        if (!wrTarget) {
            return console.error('EvmEventsMap:: remove faild, target is not found');
        }

        const t = map.get(wrTarget);
        if (!t[event]) {
            return console.error(`EvmEventsMap:: remove faild, event (${event}) is not found`);
        }

        // options 不能比同一个对象，比字符串的值

        const index = t[event].findIndex(l => {
            const fun = l.listener.deref();
            if (!fun) {
                return false;
            }
            return fun === listener && isSameStringifyObject(l.options, options)
        });

        if (index >= 0) {
            t[event].splice(index, 1);
        }

        const hasItem = t[event].some(l => l.listener.deref());
        if (!hasItem) {
            delete t[event];
        }
        if (Object.keys(t).length === 0) {
            map.delete(wrTarget);
        }
        return this;
    }

    /**
     * 
     * @param wrTarget WeakRef(Node)
     * @returns 
     */
    remove(wrTarget) {
        return this.#map.delete(wrTarget);
    }

    /**
     * 
     * @param target  Node
     * @returns 
     */
    removeByTarget(target) {
        const wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return;
        }
        return this.#map.delete(wrTarget);
    }

    /**
     * Node
     * @param target Node节点
     * @returns 
     */
    hasByTarget(target) {
        return !!this.getKeyFromTarget(target)
    }

    /**
     * 
     * @param wrTarget WeakRef(Node)
     * @returns 
     */
    has(wrTarget) {
        return this.#map.has(wrTarget);
    }

    getEventsObj(target) {
        let wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return null;
        }
        const eventsObj = this.#map.get(wrTarget);
        return eventsObj;
    }


    hasListener(target, event, listener, options) {
        let wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return false;
        }
        const t = this.#map.get(wrTarget);
        if (!t) return false;
        const wrListeners = t[event];

        if (!Array.isArray(wrListeners)) {
            return false;
        }

        return wrListeners.findIndex(lobj => {
            const l = lobj.listener.deref();
            if (!l) {
                return false;
            }
            return l === listener && isSameStringifyObject(options, l.options)
        }) > -1

    }

    getExtremelyItems(target, event, listener, options) {

        const eventsObj = this.getEventsObj(target);
        if (!eventsObj) {
            return null;
        }
        const listenerObjs = eventsObj[event];
        if (!listenerObjs) {
            return null;
        }
        const items = listenerObjs.filter(l => isSameFunction(l.listener.deref(), listener, true) && isSameStringifyObject(l.options, options));
        return items;
    }

    get data() {
        return this.#map
    }
}