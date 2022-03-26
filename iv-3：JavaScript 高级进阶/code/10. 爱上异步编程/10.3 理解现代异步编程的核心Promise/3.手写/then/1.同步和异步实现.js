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
    /**
            var p = new MyPromise((resolve, reject) => { setTimeout(resolve)});
            p.then(()=>console.log("..."));
            p.then(()=>console.log("..."))
        */
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
    this._changePromiseStatus(rejected, value);
    this._triggerExecuteCollection(this.rejectedCallbacks);
  }

  /**
   * 成功
   * @memberOf MyPromise
   */
  resolve(value) {
    //状态不可逆，必须从pending 改变
    if (this.PromiseStatus !== pending) return;
    this._changePromiseStatus(fulfilled, value);
    this._triggerExecuteCollection(this.fulfilledCallbacks);
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
      onFulfilled(this.PromiseValue);
      return;
    }

    if (this.PromiseStatus === rejected) {
      onRejected(this.PromiseValue);
      return;
    }
  }
}

// new MyPromise((resolve,reject)=>{
//     resolve("5")
// }).then((res)=>{
//     console.log("收到结果",res);
// })

// new MyPromise((resolve,reject)=>{
//     reject(new Error("eee"))
// }).then((res)=>{
//     console.log("收到结果",res);
// },(err)=>{
//     console.log(err)
// })

// new MyPromise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("异步")
//     },3000)
// }).then((res)=>{
//     console.log("收到结果",res);
// })

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("异步");
  }, 3000);
});

p2.then((a) => {
  console.log("第一次：", a);
});

p2.then((a) => {
  console.log("第二次", a);
});

p2.then((a) => {
  console.log("第三次", a);
});
