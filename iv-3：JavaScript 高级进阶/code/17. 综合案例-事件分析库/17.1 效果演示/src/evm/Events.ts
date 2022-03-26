
import BaseEvm from "../BaseEvm";
import { BaseEvmOptions, EVMBaseEventListener, ListenerWrapper } from "../types";
import { booleanTrue, isFunction, isObject } from "../util";

const DEFAULT_OPTIONS: BaseEvmOptions = {
  isInWhiteList: booleanTrue
}

const ADD_PROPERTIES = ["addListener", "addEventListener", "on", "prependListener"];
const REMOVE_PROPERTIES = ["removeListener", "removeEventListener", "off"];


/**
 * EVM for events
*/
export default class EventsEVM extends BaseEvm<undefined> {

  protected orgEtPrototype: any;
  protected rpList: {
    proxy: object;
    revoke: () => void;
  }[] = [];
  protected et: any;

  constructor(options: BaseEvmOptions = DEFAULT_OPTIONS, et: any) {
    super({
      ...DEFAULT_OPTIONS,
      ...options
    });

    if (et == null || !isObject(et.prototype)) {
      throw new Error("参数et的原型必须是一个有效的对象")
    }
    this.orgEtPrototype = { ...et };
    this.et = et;

  }

  #getListener(listener: Function | ListenerWrapper) {

    //?? isFunction
    if (typeof listener == "function") {
      return listener
    }

    if (isObject(listener) && isFunction(listener.listener)) {
      return listener.listener
    }
    return null;
  }

  #innerAddCallback: EVMBaseEventListener = (target, event, listener) => {
    const fn = this.#getListener(listener)
    if (!isFunction(fn as Function)) {
      return;
    }
    return super.innerAddCallback(target, event, fn as Function, undefined);
  }

  #innerRemoveCallback: EVMBaseEventListener = (target, event, listener) => {
    const fn = this.#getListener(listener)
    if (!isFunction(fn as Function)) {
      return;
    }
    return super.innerRemoveCallback(target, event, fn as Function, undefined);
  }


  watch() {
    super.watch();
    let rp;
    // addListener addEventListener on prependListener
    rp = this.checkAndProxy(this.et.prototype, this.#innerAddCallback, ADD_PROPERTIES);
    if (rp !== null) {
      this.rpList.push(rp);
    }
    // removeListener removeEventListener off
    rp = this.checkAndProxy(this.et.prototype, this.#innerRemoveCallback, REMOVE_PROPERTIES);
    if (rp !== null) {
      this.rpList.push(rp);
    }

    return () => this.cancel();
  }

  cancel() {
    super.cancel();
    this.restoreProperties(this.et.prototype, this.orgEtPrototype, ADD_PROPERTIES);
    this.restoreProperties(this.et.prototype, this.orgEtPrototype, REMOVE_PROPERTIES);
    this.rpList.forEach(rp => rp.revoke());
    this.rpList = [];
  }
}