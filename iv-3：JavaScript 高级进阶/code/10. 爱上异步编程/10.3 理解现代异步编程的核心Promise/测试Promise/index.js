
import { resolve } from '@rollup/plugin-node-resolve';
//输出构造
const p1=new Promise((resolve,reject)=>{});
console.log(p1);


//查看 resolve 和 reject 

const p2=new Promise((resolve,reject)=>{
    resolve(5);
});
console.log(p2);



const p3=new Promise((resolve,reject)=>{
    reject("错误");
});
console.log(p3);


//查看报错触发 reject


const p4=new Promise((resolve,reject)=>{
    throw new Error("自定义错误");
});
console.log(p4);


//then

const p5=new Promise((resolve,reject)=>{
    resolve(5);
});

p5.then((a)=>{
    console.log("第一次",a);
    return a * 10;
}).then((f)=>{
    console.log("第二次",f);
})


//then 循环应用
const p6 = new Promise((resolve,reject)=>{
    resolve(6);
});


p6.then((result)=>{
    console.log("result==",result);
    return p6;
}).catch((e)=>{
    console.log("eee",e);
})




// then  返回 Promise


const p8=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(6000);
    },3000)
});

const p7 = new Promise((resolve,reject)=>{
    resolve(p8);
});

p7.then((result)=>{
    console.log(result);
})

//异步
let p9 = new Promise((resolve, reject) => {
    console.log("1");
    resolve('测试');
})

p9.then(
    result => {
        console.log('resolve:', result);
    },
    reason => {
        console.log('reject:', reason)
    }
)

console.log("2");