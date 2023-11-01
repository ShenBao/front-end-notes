

const p1 = new Promise((resolve, reject) => {
    reject(5);
});

//推荐，最后统一catch处理
p1.then((res)=>{
    //不会执行
    console.log("res1",res);
}).then((res)=>{
    //不会执行
    console.log("res2",res)
}).catch((e)=>{
    console.log("reject 错误：",e);
});




