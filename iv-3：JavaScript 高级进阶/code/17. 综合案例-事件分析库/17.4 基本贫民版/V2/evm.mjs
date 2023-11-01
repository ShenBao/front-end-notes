
import EvmEventsMap from "./evmEventsMap.mjs";
import {
  createRevocableProxy, createApplyHandler, isFunction,
  isSameStringifyObject, isSameFunction, booleanFalse
} from "./util.mjs"

// 保留原始的原型
const orgEventTargetPro = { ...EventTarget.prototype };

const DEFAULT_OPTIONS = {
  /**
   * 选项相同判断函数
   */
  isSameOptions: isSameStringifyObject,
  /**
   * 白名单判断函数
   */
  isInWhiteList: booleanFalse
}

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

  /**
   * 添加事件回调函数
   * @param {*} target 
   * @param {*} event 
   * @param {*} listener 
   * @param {*} options 
   * @returns 
   */
  #innerAddCallback = (target, event, listener, options) => {

    const { isInWhiteList } = this.options;
    const argList = [target, event, listener, options];
    //判断是否在白名单
    if (isInWhiteList(target, event, listener, options)) {
      return;
    }
    // listener 是否是方法
    if (!isFunction(listener)) {
      return console.warn("EVM::innerAddCallback listener must be a function");
    }
    //是否有重复添加的情况
    const sameItems = this.#getSameItems(...argList);
    if (Array.isArray(sameItems) && sameItems.length > 0) {
      //有重复添加情况，打印警告日志
      console.warn(event, target, " hasSameItems:", sameItems);
    }
    //将事件存储进统计容器
    this.#eventsMap.add(...argList);
  }
  /**
   * 移除事件回调函数
   * @param {*} target 
   * @param {*} event 
   * @param {*} listener 
   * @param {*} options 
   * @returns 
   */
  #innerRemoveCallback = (target, event, listener, options) => {
    const argList = [target, event, listener, options];
    if (!isFunction(listener)) {
      return console.warn("EVM::innerAddCallback listener must be a function");
    }
    //将事件移除统计容器
    this.#eventsMap.remove(...argList);
  }

  #getSameItems(target, event, listener, options) {
    if (!this.#eventsMap.hasListener(target, event, listener, options)) {
      return null;
    }
    //获取配置，是否需要比对方法的选项。
    const { isSameOptions } = this.options;
    const listeners = this.#eventsMap.data.get(target)[event];
    //判断方法相同以及选项相同
    const items = listeners.filter(l => isSameFunction(l.listener, listener, true) && isSameOptions(l.options, options));
    //返回所有相同的 []
    return items;
  }

  watch() {
    //创建两个方法的可撤销代理对象
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

}