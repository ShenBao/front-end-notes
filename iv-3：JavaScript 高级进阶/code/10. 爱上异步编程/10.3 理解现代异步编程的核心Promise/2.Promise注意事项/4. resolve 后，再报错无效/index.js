

const p2 = new Promise((resolve, reject) => {
    resolve(5);
    throw new Error("自定义错误")
});


p2.then((res)=>{
    //不会执行
    console.log("res1",res);
    return res + 1;
}).then((res)=>{
    //不会执行
    console.log("res2",res)
}).catch((e)=>{
    console.log("reject 错误：",e);
});


