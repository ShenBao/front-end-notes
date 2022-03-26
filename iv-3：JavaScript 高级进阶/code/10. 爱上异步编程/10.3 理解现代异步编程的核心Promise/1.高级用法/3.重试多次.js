function isFunction(fn) {
  return typeof fn === "function" || fn instanceof Function;
}

function retry(fun, count, assert = () => false) {
  if (!isFunction(fun)) {
    return Promise.resolve();
  }
  return new Promise(async (resolve, reject) => {
    let error = null; //错误值
    for (let tryCount = 1; tryCount <= count; tryCount++) {
      try {
        const value = await fun(tryCount);
        if (assert(value, tryCount)) {
          return resolve(value);
        }
      } catch (e) {
        error = e;
      }
    }
    reject(new Error("多次尝试失败"));
  });
}

// retry(()=>{
//     throw new Error("错误")
// },3).catch((e)=>{
//     console.log("捕获到错误：",e)
// });

let index = 0;

function createPromise(tryCount) {
  console.log("尝试次数:", tryCount);
  return new Promise((resolve, reject) => {
    index++;
    setTimeout(() => {
      resolve(index);
    }, 1000);
  });
}

retry(createPromise, 10, (res) => {
  return res == 5;
})
  .then((res) => {
    console.log("当前的数据:", res);
  })
  .catch((e) => {
    console.log("捕获到错误：", e);
  });
