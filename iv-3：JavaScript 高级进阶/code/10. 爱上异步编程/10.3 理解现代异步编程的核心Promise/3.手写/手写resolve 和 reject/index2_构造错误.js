const pending = Symbol("pending");
const fulfilled = Symbol("fulfilled");
const rejected = Symbol("Rejected");

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending;
    this.PromiseValue = null;
    //绑定函数this指向
    this._initBind();
    //执行回调
    this._execute(callback);
  }

  _initBind() {
    this.reject = this.reject.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  /**
   * 捕获异常，调用reject
   * @param {any} callback
   *
   * @memberOf MyPromise
   */
  _execute(callback) {
    try {
      callback(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  /**
   * 改变Promise状态
   * @param {any} statusType 状态类型
   * @param {any} value   最终结果
   * @returns
   *
   * @memberOf MyPromise
   */
  _changePromiseStatus(statusType, value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return;
    //改变状态
    this.PromiseStatus = statusType;

    this.PromiseValue = value;
  }

  /**
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    this._changePromiseStatus(rejected, value);
  }

  /**
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    this._changePromiseStatus(fulfilled, value);
  }
}

// const p4=new MyPromise((resolve,reject)=>{
//     throw new Error("自定义错误");
// });
// console.log(p4);
