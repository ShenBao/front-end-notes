// 普通函数
function a() {}
console.log(a.__proto__.__proto__.__proto__);


// 作为构造函数
function Person() {}
var person = new Person();
console.log(person.__proto__.__proto__.__proto__);


// obj 二代
// var obj  = {};
// console.log(obj.__proto__.__proto__)