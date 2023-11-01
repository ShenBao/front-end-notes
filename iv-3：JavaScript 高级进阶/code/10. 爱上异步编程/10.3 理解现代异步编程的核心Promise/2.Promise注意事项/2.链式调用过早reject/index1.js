

const p1 = new Promise((resolve, reject) => {
    reject(5);
});

p1.then((res) => {
    //不会执行
    console.log("res1", res);
}, (rejectResult) => {
    //执行
    console.log("处理reject result", rejectResult);
    return rejectResult;
}).then((res) => {
    //执行
    console.log("res2", res)
}).catch((e) => {
    //不会执行
    console.log("reject 错误：", e);
});



