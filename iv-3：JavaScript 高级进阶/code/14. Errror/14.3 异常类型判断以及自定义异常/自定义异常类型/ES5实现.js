function MyError(message) {
  this.name = "MyError";
  this.message = message || "Default Message";
  // this.stack = (new Error()).stack;
  /*
   * Error.captureStackTrace(targetObject[, constructorOpt])
   * 参数 targetObject -> 表示一个对象
   * 参数 constructorOpt -> 表示对象的构造函数
   * 在targetObject上创建一个.stack属性， 调用是返回一个调用 Error.captureStackTrace() 的位置的字符串。
   */
  // Error.captureStackTrace(this, MyError)
}

MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

function trace() {
  try {
    throw new MyError("custom message");
  } catch (e) {
    console.log("是否是MyError类型错误:", e instanceof MyError); // true
    console.log("e.message:", e.message); // 'custom message'

    console.log("stack:", e.stack);
  }
}

function b() {
  trace();
}

function a() {
  b();
}

a();
