var obj = {};

console.log(obj.toString());

// toString 方法是不是来自原型
console.log(obj.toString === Object.prototype.toString);

console.log(obj instanceof Object)