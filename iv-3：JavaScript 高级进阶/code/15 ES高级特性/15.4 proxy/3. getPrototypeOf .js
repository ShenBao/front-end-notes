
var obj = new Object();

var proxyObj = new Proxy(obj, {
  getPrototypeOf(target) {
    console.log("proxyObj getPrototypeOf");
    return Reflect.getPrototypeOf(target);
  }
});

console.log("Object.getPrototypeOf:")
Object.getPrototypeOf(proxyObj);
console.log();


console.log("Reflect.getPrototypeOf:")
Reflect.getPrototypeOf(proxyObj);
console.log();

console.log("__proto__")
proxyObj.__proto__;
console.log();

console.log("Object.prototype.isPrototypeOf")
Object.prototype.isPrototypeOf(proxyObj);
console.log();

console.log("instanceof")
proxyObj instanceof Object
console.log();