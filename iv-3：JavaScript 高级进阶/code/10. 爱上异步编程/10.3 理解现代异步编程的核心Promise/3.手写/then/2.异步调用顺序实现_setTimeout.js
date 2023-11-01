const pending = Symbol("pending");
const fulfilled = Symbol("fulfilled");
const rejected = Symbol("Rejected");

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending;
    this.PromiseValue = null;
    //初始化集合
    this._initCollection();
    //绑定函数this指向
    this._initBind();
    //执行回调
    this._execute(callback);
  }

  _initCollection() {
    //初始化成功回调集合
    this.fulfilledCallbacks = [];
    //初始化失败回调集合
    this.rejectedCallbacks = [];
  }

  _initBind() {
    this.reject = this.reject.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  /**
   *
   * 捕获异常，调用reject
   * @param {any} callback
   *
   * @memberOf MyPromise
   */
  _execute(callback) {
    try {
      callback(this.resolve, this.reject);
    } catch (e) {
      this.reject(e.message);
    }
  }

  /**
   * 触发执行集合
   * @param {any} array
   *
   * @memberOf MyPromise
   */
  _triggerExecuteCollection(array) {
    while (array.length > 0) {
      array.shift()(this.PromiseValue);
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
    //改变状态
    this.PromiseStatus = statusType;

    this.PromiseValue = value;
  }

  /**
   * 失败
   * @memberOf MyPromise
   */
  reject(value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return;
    setTimeout(() => {
      this._changePromiseStatus(rejected, value);
      this._triggerExecuteCollection(this.rejectedCallbacks);
    });
  }

  /**
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    if (this.PromiseStatus !== pending) return;
    setTimeout(() => {
      this._changePromiseStatus(fulfilled, value);
      this._triggerExecuteCollection(this.fulfilledCallbacks);
    });
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => {};
    onRejected = typeof onRejected === "function" ? onRejected : () => {};

    //没有结果
    if (this.PromiseStatus === pending) {
      //添加成功回调，真正调用等成功 resolve 函数执行触发
      this.fulfilledCallbacks.push(onFulfilled.bind(this));
      //添加失败回调，真正调用等拒绝 reject 函数执行触发
      this.rejectedCallbacks.push(onRejected.bind(this));
      return;
    }

    //有结果，立即执行
    if (this.PromiseStatus === fulfilled) {
      setTimeout(() => {
        onFulfilled(this.PromiseValue);
      });
      return;
    }

    if (this.PromiseStatus === rejected) {
      setTimeout(() => {
        onRejected(this.PromiseValue);
      });
      return;
    }
  }
}

let p1 = new MyPromise((resolve, reject) => {
  console.log("1");
  resolve("测试");
});

p1.then(
  (result) => {
    console.log("resolve:", result);
  },
  (reason) => {
    console.log("reject:", reason);
  }
).then((_) => {
  console.log("then.then:");
});
