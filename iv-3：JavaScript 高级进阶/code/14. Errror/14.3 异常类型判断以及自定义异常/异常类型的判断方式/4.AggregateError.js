function print(e) {
  console.log("错误类型：", e.constructor.name);
  console.log("错误信息：", e.message);
  if (e.constructor.name == "AggregateError" && e.errors) {
    for (let i = 0; i < e.errors.length; i++) {
      console.log(`错误信息${i}:`, e.errors[i].message);
    }
  }
  console.log("--------------------------------");
}

function testError() {
  //AggregateError
  Promise.any([
    Promise.reject(new Error("error 1")),
    Promise.reject(new Error("error 2")),
  ]).catch((e) => {
    print(e);
  });
}

testError();
