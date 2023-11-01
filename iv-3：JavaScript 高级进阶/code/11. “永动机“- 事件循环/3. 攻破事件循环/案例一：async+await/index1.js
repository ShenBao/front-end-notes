async function async1() {
  console.log("async1 start");
  await async2();
  // .then()
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
// new Promise(function(resolve, reject) {
//     resolve(undefined);
// })

console.log("main start");

setTimeout(function () {
  console.log("setTimeout");
});
async1();
new Promise(function (resolve) {
  console.log("promise 构造");
  resolve();
}).then(function () {
  console.log("promise then");
});

console.log("main end");

// 宏任务：
// 微任务：

/* 输出 */
// main start
// async1 start
// async2
// promise 构造
// main end
// async1 end
// promise then
// setTimeout

// js主线程 "main-start"  "async1 start"   "async2"  "promise 构造"  "main end"
// 宏任务："setTimeout"
// 微任务： "async1 end"  “promise then”
