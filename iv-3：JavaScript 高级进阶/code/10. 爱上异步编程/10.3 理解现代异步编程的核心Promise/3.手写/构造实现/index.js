// const p1=new Promise((resolve,reject)=>{});
// console.log(p1);

//定义promise 三种状态
const pending = Symbol("pending");
const fulfilled = Symbol("fulfilled");
const rejected = Symbol("Rejected");

class MyPromise {
  constructor(callback) {
    //初始化状态
    this.PromiseStatus = pending;
    this.PromiseValue = null;
    //绑定函数this指向
    this.initBind();
    //执行回调
    callback(this.resolve, this.reject);
  }

  initBind() {
    this.reject = this.reject.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  /**
   *
   *
   * 失败
   * @memberOf MyPromise
   */
  reject() {}

  /**
   *
   *
   * 成功
   * @memberOf MyPromise
   */
  resolve() {}
}
