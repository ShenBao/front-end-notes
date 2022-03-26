
import EventEmitter from "./EventEmitter";
import EvmEventsMap from "./EventsMap";
import { BaseEvmOptions, EventsMapItem, EventType, StatisticsOptions, TypeListenerOptions } from "./types";
import { booleanFalse, isSameStringifyObject, checkAndProxy, createPureObject, delay, getFunctionContent, isBuiltinFunctionContent, isFunction, isObject, restoreProperties, getStack, executeGC } from "./util";
import * as bindUtil from "./bindUtil"

const DEFAULT_OPTIONS: BaseEvmOptions = {
  /**
   * 选项相同判断函数
  */
  isSameOptions: isSameStringifyObject,
  /**
   * 白名单判断函数
   */
  isInWhiteList: booleanFalse,
  maxContentLength: 200,
  overrideBind: false,
}


const toString = Object.prototype.toString

export default class EVM<O = any>{
  protected watched: boolean = false;
  private emitter = new EventEmitter();
  private eventsMap: EvmEventsMap<O>;

  private options: BaseEvmOptions;

  constructor(options: BaseEvmOptions<O> = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    this.eventsMap = new EvmEventsMap({
      isSameOptions: this.options.isSameOptions!
    });

    this.innerAddCallback = this.innerAddCallback.bind(this);
    this.innerRemoveCallback = this.innerRemoveCallback.bind(this);
  }

  #listenerRegistry = new FinalizationRegistry<{ weakRefTarget: WeakRef<object> }>(
    ({ weakRefTarget }) => {
      console.log("evm::clean up ------------------");
      if (!weakRefTarget) {
        return;
      }
      this.eventsMap.remove(weakRefTarget);
      console.log("length", [...this.eventsMap.data.keys()].length);
    }
  )

  innerAddCallback(target: Object, event: EventType, listener: Function, options: O) {

    const { isInWhiteList } = this.options;

    if (!isInWhiteList!(target, event, listener, options)) {
      return;
    }

    if (!isFunction(listener)) {
      return console.warn("EVM::innerAddCallback listener must be a function");
    }

    // EventTarget  https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#multiple_identical_event_listeners
    // 多次添加，覆盖
    if (isObject(target) && target instanceof EventTarget && this.eventsMap.hasListener(target, event, listener, options)) {
      return console.log(`EventTarget 注册了多个相同的 EventListener， 多余的丢弃！${toString.call(target)} ${event} ${listener.name} 多余的丢弃`);
    }

    const eItems = this.eventsMap.getExtremelyItems(target, event, listener, options);
    if (Array.isArray(eItems) && eItems.length > 0) {
      console.warn(`${toString.call(target)}-${target.constructor.name}`, " ExtremelyItems: type:", event, " name:" + (listener.name || "unknown"), " options: " + options, " content:" + listener.toString().slice(0, 100));
    }

    // console.log("add:", Object.prototype.toString.call(target), event);

    let weakRefTarget;
    if (!this.eventsMap.hasByTarget(target)) {
      weakRefTarget = new WeakRef(target);
      this.#listenerRegistry.register(target, { weakRefTarget });
    }

    this.eventsMap.addListener(weakRefTarget ? weakRefTarget : target, event, listener, options);
    // this.#emitter.emit("on-add", ...argList);

  }

  innerRemoveCallback(target: Object, event: EventType, listener: Function, options: O) {

    const { isInWhiteList } = this.options;
    if (!isInWhiteList!(target, event, listener, options)) {
      return;
    }

    if (!isFunction(listener)) {
      return console.warn("EVM::innerAddCallback listener must be a function");
    }

    if (!this.eventsMap.hasByTarget(target)) {
      return;
    }
    // console.log("remove:", Object.prototype.toString.call(target), event);

    this.eventsMap.removeListener(target, event, listener, options);
    // this.#emitter.emit("on-remove", ...argList)
  }


  /**
   * 检查属性，并产生代理
   * @param prototype 
   * @param callback 
   * @param ckProperties 
   * @param proxyProperties 
   * @returns 
   */
  protected checkAndProxy = checkAndProxy;

  /**
   * 还原属性方法
   */
  protected restoreProperties = restoreProperties;



  #getListenerContent(listener: Function) {
    // const { maxContentLength } = this.options;
    return listener.toString(); //.slice(0, maxContentLength)
  }

  #getListenerInfo(listener: Function, containsContent: boolean = false) {
    const name = listener.name || "unkown";
    if (!containsContent) {
      return name;
    }
    return createPureObject({
      name,
      content: this.#getListenerContent(listener),
      stack: getStack(listener)
    }) as Record<string, any>;
  }

  async statistics({
    containsContent = false,
    forceGC = true,
  }: StatisticsOptions = {}) {

    if (forceGC) {
      await executeGC()
    }

    const data = this.data;
    const keys = [...data.keys()];
    const d = keys.map(wr => {
      const el = wr.deref();
      if (!el) return null;

      const events = data.get(wr);
      if (!events) {
        return createPureObject();
      }
      return {
        constructor: el?.constructor?.name,
        type: toString.call(el),
        // id: el.id,
        // class: el.className,
        events: [...events.keys()].reduce((obj, cur) => {
          const items = events.get(cur)?.map(e => {
            const fn = e.listener.deref();
            if (!fn) return null;
            return this.#getListenerInfo(fn, containsContent);
          }).filter(Boolean)

          if (items && items.length > 0) {
            obj.set(cur, items);
          }

          return obj
        }, new Map())
      }
    })

    return d;
  }

  #getExtremelyListeners(eventsInfo: EventsMapItem[] = []) {
    const map = new Map();
    let listener, listenerStr, listenerKeyStr;
    let info;
    for (let i = 0; i < eventsInfo.length; i++) {
      info = 0;
      const eInfo = eventsInfo[i];
      listener = eInfo.listener.deref();
      // 被回收了
      if (!listener) {
        continue;
      }
      // 函数 + options
      listenerStr = getFunctionContent(listener)
      if (isBuiltinFunctionContent(listenerStr)) {
        continue;
      }
      // TODO::  improve
      listenerKeyStr = listenerStr + ` %s----%s ${JSON.stringify(eInfo.options)}`
      // console.log("listenerKeyStr:", listenerKeyStr);
      info = map.get(listenerKeyStr);
      if (!info) {
        map.set(listenerKeyStr, {
          ...(this.#getListenerInfo(listener, true) as Object),
          count: 1,
          options: eInfo.options
        })
      } else {
        info.count++
      }
    }

    return [...map.values()].filter(v => v.count > 1);
  }

  async getExtremelyItems(forceGC: boolean = true) {

    if (forceGC) {
      await executeGC();
    }

    const data = this.data;
    const keys = [...data.keys()];
    const d = keys.map(wr => {
      const el = wr.deref();
      if (!el) return null;

      const eventsObj = data.get(wr);

      if (!eventsObj) {
        return createPureObject();
      }

      let exItems: EventsMapItem[];
      const eventsMap = [...eventsObj.keys()].reduce((obj, cur: EventType) => {
        exItems = this.#getExtremelyListeners(eventsObj.get(cur));
        if (exItems.length > 0) {
          obj.set(cur, exItems);
        }
        return obj

        // 使用map而不适用Object，因为key可能是Symbol
      }, new Map());

      const events = [...eventsMap.keys()].reduce((evs, key) => {
        const arr = eventsMap.get(key) || [];
        evs.push(...arr.map((ev: any) => {
          ev.key = key;
          return ev;
        }));
        return evs;
      }, [])


      return events.length > 0 ? createPureObject({
        type: toString.call(el),
        constructor: el?.constructor?.name,
        key: events[0].key,
        // id: el.id,
        // class: el.className,
        events
      }) : null
    }).filter(Boolean)

    return d;
  }


  // onAdd(fn: Function): void {
  //   this.emitter.on("on-add", fn)
  // }

  // offAdd(fn: Function) {
  //   this.emitter.off("on-add", fn)
  // }

  // onRemove(fn: Function) {
  //   this.emitter.on("on-remove", fn)
  // }

  // offRemove(fn: Function) {
  //   this.emitter.off("on-remove", fn)
  // }

  // onAlarm(fn: Function) {
  //   this.emitter.on("on-alarm", fn)
  // }

  // offAlarm(fn: Function) {
  //   this.emitter.off("on-alarm", fn)
  // }

  watch() {
    if (this.watched) {
      return console.error("watched")
    }
    if (this.options.overrideBind) {
      bindUtil.doBind();
    }
    this.watched = true;
  }

  cancel() {
    this.watched = false;
    if (this.options.overrideBind) {
      bindUtil.undoBind();
    }
  }

  get data() {
    return this.eventsMap.data;
  }

  removeByTarget(target: Object) {
    this.eventsMap.removeByTarget(target);
  }

  removeEventsByTarget(target: Object, type: EventType) {
    this.eventsMap.removeEventsByTarget(target, type);
  }

}