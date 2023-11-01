import { createPureObject, isSameStringifyObject } from "./util.mjs"

export default class EvmEventsMap {

    #wp = new WeakMap();

    /**
     * 添加
     * @param target Node节点
     * @param event 事件类型，比如click, resize等
     * @param listener 事件处理程序
     */
    add(target, event, listener, options) {
        const wp = this.#wp;
        let t = wp.get(target);
        if (!t) {
            t = createPureObject();
            wp.set(target, t);
        }
        if (!t[event]) {
            t[event] = [];
        }
        t[event].push({
            listener,
            options
        });
        return this;
    }

    /**
     * 删除
     * @param target Node节点
     * @param event 事件类型，比如click, resize等
     * @param listener 事件处理程序
     * @returns undefined
     */
    remove(target, event, listener, options) {
        const wp = this.#wp;
        if (!this.hasKey(target)) {
            return;
        }
        if (!this.hasEventType(target, event)) {
            return;
        }

        const t = wp.get(target);
        // options 不能比同一个对象，比字符串的值
        const index = t[event].findIndex(l => l.listener === listener
            && isSameStringifyObject(l.options, options));

        if (index >= 0) {
            t[event].splice(index, 1);
        }
        if (t[event].length === 0) {
            delete t[event];
        }
        if (Object.keys(t).length === 0) {
            wp.delete(target);
        }
        return this;
    }

    /**
     * 是否有这个key
     * @param target Node节点
     * @returns 
     */
     hasKey(target) {
        return this.#wp.has(target);
    }

    /**
     * 是否需有指定的事件类型
     * @param target Node节点
     * @param event 事件类型，比如click, resize等
     * @returns  布尔值
     */
    hasEventType(target, event) {
        // 不是对象
        if (typeof target !== "object") {
            return false;
        }
        const wp = this.#wp;
        let t = wp.get(target);
        if (!t) {
            return false;
        }
        if (!t[event]) {
            return false;
        }
        return true;
    }

    /**
     * 是否需有指定的事件类型的事件处理程序
     * @param target Node节点
     * @param event 事件类型，比如click, resize等
     * @param listener 事件处理程序
     * @returns 布尔值
     */
    hasListener(target, event, listener, options) {
        if (!this.hasEventType(target, event)) {
            return false;
        }
        return this.#wp.get(target)[event].findIndex(l => l.listener === listener && isSameStringifyObject(l.options, options))
    }

    get data() {
        return this.#wp
    }
}