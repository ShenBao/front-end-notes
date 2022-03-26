import { EventsMapItem, EventType, EvmEventsMapOptions, ISameFunction, ISameOptions } from "./types";
import { copyListenerOption, isSameFunction, isSameStringifyObject } from "./util";

const DEFAULT_OPTIONS: EvmEventsMapOptions = {
    isSameOptions: isSameStringifyObject,
    isSameFunction,
}

export default class EvmEventsMap<T = any> {

    private isSameOptions: ISameOptions<T>;
    private isSameFunction: ISameFunction;
    constructor(options: EvmEventsMapOptions = DEFAULT_OPTIONS) {
        const opt = { ...DEFAULT_OPTIONS, ...options };
        this.isSameOptions = opt.isSameOptions!;
        this.isSameFunction = opt.isSameFunction!;
    }

    #map = new Map<WeakRef<Object>, Map<EventType, EventsMapItem<T>[]>>();

    /**
     * 
     * @param target 被弱引用的对象
     * @returns 
     */
    getKeyFromTarget(target: object) {
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
     * @param target object或者 WeakRef(object)
     * @param event 事件类型，比如message,click等
     * @param listener 事件处理程序
     */
    addListener(target: Object, event: EventType, listener: Function, options: T) {

        const map = this.#map;

        let t: Map<EventType, EventsMapItem<T>[]> | undefined;
        // target 如果是 WeakRef, 直接使用
        let wrTarget = target instanceof WeakRef ? target : this.getKeyFromTarget(target);

        if (!wrTarget) {
            wrTarget = new WeakRef(target);
        }
        t = this.#map.get(wrTarget);
        if (!t) {
            t = new Map<EventType, EventsMapItem<T>[]>();
            map.set(wrTarget, t);
        }

        if (!t.has(event)) {
            t.set(event, []);
        }
        const eventsInfo = t.get(event);
        if (!eventsInfo) {
            return this;
        }
        eventsInfo.push({
            listener: new WeakRef(listener),
            options: copyListenerOption(options) as T
        });
        return this;
    }

    /**
     * 添加
     * @param target object或者 WeakRef(object)
     * @param event 事件类型，比如message,click等
     * @param listener 事件处理程序
     */
    removeListener(target: Object, event: EventType, listener: Function, options: T) {
        const map = this.#map;

        let wrTarget = target instanceof WeakRef ? target : this.getKeyFromTarget(target);
        if (!wrTarget) {
            return console.error('EvmEventsMap:: remove failed, target is not found');
        }

        const t = map.get(wrTarget);

        if (!t) {
            return
        }
        if (!t.has(event)) {
            return console.error(`EvmEventsMap:: remove failed, event (${event}) is not found`);
        }

        // options 不能比同一个对象，比字符串的值
        const eventsInfo = t.get(event);
        if (!eventsInfo) {
            return this;
        }
        const index = eventsInfo.findIndex(l => {
            const fun = l.listener.deref();
            if (!fun) {
                return false;
            }
            return fun === listener && this.isSameOptions(l.options, options)
        });

        if (index >= 0) {
            eventsInfo.splice(index, 1);
        }

        const hasItem = eventsInfo.some(l => l.listener.deref());
        if (!hasItem) {
            t.delete(event);
        }
        if (Object.keys(t).length === 0) {
            map.delete(wrTarget);
        }
        return this;
    }

    /**
     * 
     * @param wrTarget WeakRef(object)
     * @returns 
     */
    remove(wrTarget: WeakRef<object>) {
        return this.#map.delete(wrTarget);
    }

    /**
     * 删除某个实例全部信息
     * @param target  object
     * @returns 
     */
    removeByTarget(target: object) {
        const wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return;
        }
        return this.#map.delete(wrTarget);
    }


    /**
     * 删除某个实例的某个类别的全部信息
     * @param target 
     * @param event 
     */
    removeEventsByTarget(target: object, event: EventType) {
        const wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return;
        }

        const infos = this.#map.get(wrTarget);
        if (!infos) {
            return;
        }

        return infos.delete(event);
    }

    /**
     * 
     * @param target  object
     * @returns 
     */
    hasByTarget(target: object) {
        return !!this.getKeyFromTarget(target)
    }

    /**
     * 
     * @param wrTarget WeakRef(object)
     * @returns 
     */
    has(wrTarget: WeakRef<object>) {
        return this.#map.has(wrTarget);
    }

    /**
     * 获取关联的事件信息信息
     * @param target 
     * @returns 
     */
    getEventsObj(target: object) {
        let wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return null;
        }
        const eventsObj = this.#map.get(wrTarget);
        return eventsObj;
    }


    /**
     * 是有已经有listener
     * @param target 
     * @param event 
     * @param listener 
     * @param options 
     * @returns 
     */
    hasListener(target: Object, event: EventType, listener: Function, options: T) {
        let wrTarget = this.getKeyFromTarget(target);
        if (!wrTarget) {
            return false;
        }
        const t = this.#map.get(wrTarget);
        if (!t) return false;
        const wrListeners = t.get(event);

        if (!Array.isArray(wrListeners)) {
            return false;
        }

        return wrListeners.findIndex(lObj => {
            const l = lObj.listener.deref();
            if (!l) {
                return false;
            }
            return l === listener && this.isSameOptions(options, lObj.options)
        }) > -1

    }

    /**
     * 获取极可能是有问题的事件监听信息
     * @param target 
     * @param event 
     * @param listener 
     * @param options 
     * @returns 
     */
    getExtremelyItems(target: Object, event: EventType, listener: Function, options: T) {

        const eventsObj = this.getEventsObj(target);
        if (!eventsObj) {
            return null;
        }
        const listenerObjs = eventsObj.get(event);
        if (!listenerObjs) {
            return null;
        }
        const items = listenerObjs.filter(l => this.isSameFunction(l.listener.deref(), listener, true) && this.isSameOptions(l.options, options));
        return items;
    }

    get data() {
        return this.#map
    }
}