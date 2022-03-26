
//1. Object.preventExtensions
var obj = { name: "张三" };
var obj1 = { name: "李四" }

Object.preventExtensions(obj);

// 不可以，添加新属性
obj.age = 2;

console.log("obj==", obj);

// 可以删除
// delete obj.name; 
// console.log("obj==",obj);

console.log(Object.isExtensible(obj));
console.log(Object.isExtensible(obj1));

