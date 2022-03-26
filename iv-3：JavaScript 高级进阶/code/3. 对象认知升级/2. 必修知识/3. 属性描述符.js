
//1 问题
const obj = {};

Object.defineProperty(obj, "name", {});


obj.name=1;

console.log(obj.name);

console.log(Object.getOwnPropertyDescriptor(obj,"name"))


// 尝试修改 writeable
// obj.name = 10;
// console.log("name", obj.name);

// // 尝试删除 configurable
// console.log(delete obj.name);

// // 尝试遍历
// console.log(Object.keys(obj))



//2. 获取属性描述符
// const obj = {name:"张三",age:12};

// console.log(Object.getOwnPropertyDescriptor(obj,"name"))

// console.log(Object.getOwnPropertyDescriptors(obj))


//工具库
// var product = {
//     price: 10
// }

// Object.defineProperty(product, 'price', {
//     set(val){
//         if(val<0){
//             throw new Error("price 必须大于0");
//         }
//     }
// })

// product.price = -10;


//3. 问题答案(有趣的默认值)
// const obj = {};

// Object.defineProperty(obj, "name", {});

// console.log(Object.getOwnPropertyDescriptor(obj,"name"))