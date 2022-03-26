
import EvmEventsMap from "./evmEventsMap.mjs";
import {
  createRevocableProxy, createApplyHandler, isFunction, booleanFalse, delay
} from "./util.mjs"

// 保留原始的原型
const orgEventTargetPro = { ...EventTarget.prototype };


const DEFAULT_OPTIONS = {
  /**
   * 白名单判断函数
   */
  isInWhiteList: booleanFalse
}


const toString = Object.prototype.toString

export default class EVM {
  #ep = EventTarget.prototype;
  #rvAdd;
  #rvRemove;
  #eventsMap = new EvmEventsMap();
  constructor(options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };
  }

  #listenerRegistry = new FinalizationRegistry(
    ({ weakRefTarget }) => {
      console.log("clean up ------------------");
      if (!weakRefTarget) {
        return;
      }
      this.#eventsMap.remove(weakRefTarget);
      console.log("length", [...this.#eventsMap.data.keys()].length);
    }
  )

  #innerAddCallback = (target, event, listener, options) => {

    const { isInWhiteList } = this.options;
    const argList = [target, event, listener, options];


    if (isInWhiteList(target, event, listener, options)) {
      return;
    }

    if (!isFunction(listener)) {
      return console.warn("EVM::innerAddCallback listener must be a function");
    }

    const eItems = this.#eventsMap.getExtremelyItems(...argList);
    if (Array.isArray(eItems) && eItems.length > 0) {
      console.warn(toString.call(target), " ExtremelyItems: type:", event, " name:" + listener.name, "options: " + options);
    }

    // console.log("add:", Object.prototype.toString.call(target), event);

    if (!this.#eventsMap.hasByTarget(target)) {
      let weakRefTarget = new WeakRef(target);
      argList[0] = weakRefTarget;
      this.#listenerRegistry.register(target, { weakRefTarget });
    }

    this.#eventsMap.addListener(...argList);
  }

  #innerRemoveCallback = (target, event, listener, options) => {

    const argList = [target, event, listener, options];
    if (!isFunction(listener)) {
      return console.warn("EVM::innerAddCallback listener must be a function");
    }

    if (!this.#eventsMap.hasByTarget(target)) {
      return;
    }
    console.log("remove:", Object.prototype.toString.call(target), event);
    this.#eventsMap.removeListener(...argList);
  }


  watch() {
    this.#rvAdd = createRevocableProxy(this.#ep.addEventListener,
      createApplyHandler(this.#innerAddCallback));
    this.#ep.addEventListener = this.#rvAdd.proxy;

    this.#rvRemove = createRevocableProxy(this.#ep.removeEventListener,
      createApplyHandler(this.#innerRemoveCallback));
    this.#ep.removeEventListener = this.#rvRemove.proxy;

    return () => this.cancelWatch();
  }

  cancelWatch() {
    if (this.#rvAdd) {
      this.#rvAdd.revoke();
    }
    this.#ep.addEventListener = orgEventTargetPro.addEventListener;

    if (this.#rvRemove) {
      this.#rvRemove.revoke();
    }
    this.#ep.removeEventListener = orgEventTargetPro.removeEventListener;
  }

  get data() {
    return this.#eventsMap.data;
  }

  /**
   * 统计功能
   * @returns 
   */
  async statistics() {
    //默认调用垃圾回收
    if (isFunction(window.gc)) {
      window.gc();
    }
    const { run } = delay(undefined, 1000);

    await run();

    const data = this.data;
    const keys = [...data.keys()];
    const d = keys.map(wr => {
      const el = wr.deref();
      if (!el) return null;
      const events = data.get(wr);
      return {
        type: toString.call(el),
        id: el.id,
        class: el.className,
        events: Object.keys(events).reduce((obj, cur) => {
          obj[cur] = events[cur].map(e => {
            const fn = e.listener.deref();
            if (!fn) return null;
            return fn.name;
          }).filter(Boolean)
          return obj
        }, Object.create(null))
      }
    })

    return d;
  }

}