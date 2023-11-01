let p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("执行p1");
    resolve("P1 fetch 请求成功");
  }, 5000);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("执行p2");
    reject("P2 fetch 请求失败");
  }, 2000);
});
let p3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("执行p3");
    resolve("P3 fetch 请求成功");
  }, 1000);
});

Promise.all([p1, p2, p3])
  .then((res) => {
    console.log("已经获取到合适的结果了===", res);
  })
  .catch((e) => {
    console.log("发生异常=", e);
  });
