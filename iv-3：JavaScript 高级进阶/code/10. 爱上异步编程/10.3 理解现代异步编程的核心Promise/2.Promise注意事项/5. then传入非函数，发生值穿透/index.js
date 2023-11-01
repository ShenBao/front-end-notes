

const p2 = new Promise((resolve, reject) => {
    resolve(5);
});


p2.then(1).then((res)=>{
    console.log("res2",res)
    return 2;
}).catch((e)=>{
    console.log("reject 错误：",e);
});