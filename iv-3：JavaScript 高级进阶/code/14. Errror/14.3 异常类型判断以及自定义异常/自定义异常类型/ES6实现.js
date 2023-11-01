class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    super(...params)

    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, CustomError)
    // }

    this.name = 'CustomError'
    this.foo = foo
    this.date = new Date()
  }
}

function trace() {
  try {
    throw new CustomError('baz', 'bazMessage')
  } catch (e) {
    console.log("是否是MyError类型错误:", e instanceof CustomError);
    console.log("e.message:", e.message);
    console.log("e.name", e.name)
    console.log("e.foo", e.foo)
    console.log("e.date", e.date)
    console.log("e.stack:", e.stack);
  }
}

function b() {
  trace();
}

function a() {
  b();
}

a();