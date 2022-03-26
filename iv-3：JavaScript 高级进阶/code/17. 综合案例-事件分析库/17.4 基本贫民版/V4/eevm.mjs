
import BaseEvm from "./baseEvm.mjs";
import { createApplyHandler, createRevocableProxy, delay, isFunction } from "./util.mjs";

const toString = Object.prototype.toString

/**
 * 
 * 基于 EventTarget 类型
 * @export
 * @class EEVM
 * @extends {BaseEvm}
 */
export default class EEVM extends BaseEvm {

  #watched = false;
  #orgEventTargetPro;
  #rvAdd;
  #rvRemove;
  #ep;

  constructor(options) {
    super(options);
    this.#orgEventTargetPro = { ...EventTarget.prototype };
    this.#ep = EventTarget.prototype;
  }

  watch() {

    if (this.#watched) {
      return console.error("watched")
    }

    this.#watched = true;

    this.#rvAdd = createRevocableProxy(this.#ep.addEventListener,
      createApplyHandler(this.innerAddCallback));
    this.#ep.addEventListener = this.#rvAdd.proxy;

    this.#rvRemove = createRevocableProxy(this.#ep.removeEventListener,
      createApplyHandler(this.innerRemoveCallback));
    this.#ep.removeEventListener = this.#rvRemove.proxy;

    return () => this.cancelWatch();
  }

  cancelWatch() {
    if (this.#rvAdd) {
      this.#rvAdd.revoke();
    }
    this.#ep.addEventListener = this.#orgEventTargetPro.addEventListener;

    if (this.#rvRemove) {
      this.#rvRemove.revoke();
    }
    this.#ep.removeEventListener = this.#orgEventTargetPro.removeEventListener;
    this.#watched = false
  }

  async statistics() {

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