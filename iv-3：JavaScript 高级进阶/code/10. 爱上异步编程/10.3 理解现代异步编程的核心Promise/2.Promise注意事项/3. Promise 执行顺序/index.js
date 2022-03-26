console.log("1");

const p1 = new Promise((resolve) => {
    console.log("2");
    // 请注意
    resolve("resolve");
    //不会终止，会继续执行后面的代码
    console.log("继续执行")
});

// 微任务
p1.then((result) => {
    console.log("p1 result");
});

// 宏任务
setTimeout(() => {
    console.log("3");
});

console.log("4");


