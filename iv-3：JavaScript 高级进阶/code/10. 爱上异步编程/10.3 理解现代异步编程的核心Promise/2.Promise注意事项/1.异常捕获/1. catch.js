

Promise.resolve("success").then((res)=>{
    console.log("res1:",res);
    throw new Error("then error");
    return "fail"
}).then((res)=>{
    console.log("res2:",res);
}).catch((e)=>{
    console.log("捕获到Promise 错误:",e);
});
