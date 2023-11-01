
var des = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

console.log(des);

// __proto__ 构造函数的原型
var obj = {};
console.log(obj.__proto__ === obj.constructor.prototype)

// Object.getPrototypeOf 替代
console.log(Object.getPrototypeOf(obj) === obj.__proto__)