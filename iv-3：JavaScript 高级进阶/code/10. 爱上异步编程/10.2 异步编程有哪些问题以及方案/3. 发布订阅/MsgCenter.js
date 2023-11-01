/**
 *
 * 消息中心
 * @class MsgCenter
 */
class MsgCenter {
  constructor() {
    this.listeners = {};
  }

  /**
   *
   *
   * 订阅
   * @memberOf MsgCenter
   */
  subscribe(type, listener) {
    if (this.listeners[type] === undefined) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
    console.log(`${type}消息订阅数：${this.listeners[type].length}`);
    return listener;
  }

  /**
   *
   *
   * 发送
   * @memberOf MsgCenter
   */
  dispatch(type, args = {}) {
    if (!type) {
      throw new Error("Event object missing 'type' property.");
    }
    if (this.listeners[type] instanceof Array) {
      const listeners = this.listeners[type];
      for (let j = 0; j < listeners.length; j++) {
        listeners[j].call(this, type, args);
      }
    }
  }

  /**
   *
   *
   * 取消订阅
   * @memberOf MsgCenter
   */
  unSubscribe(type, listener) {
    if (this.listeners[type] instanceof Array) {
      const listeners = this.listeners[type];
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
      console.log(`${type}消息订阅数：${this.listeners[type].length}`);
    }
  }

  /**
   *
   * 获取某种消息所有订阅
   * @param {any} type
   * @returns
   *
   * @memberOf MsgCenter
   */
  getTypeSubscribe(type) {
    return this.listeners[type] || [];
  }

  /**
   *
   *
   * 销毁
   * @memberOf MsgCenter
   */
  destroy() {
    this.listeners = null;
  }
}

const MyMsgCenter = new MsgCenter();

export default MyMsgCenter;
