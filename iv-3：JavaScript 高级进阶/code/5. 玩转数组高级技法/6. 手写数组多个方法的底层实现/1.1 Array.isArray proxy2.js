const arr = ["1"];
const proxy = new Proxy(arr, {});
const log = console.log;


log("__proto__:", proxy.__proto__ === Array.prototype)
log("instanceof:", proxy instanceof Array)  

console.log("-------------------")
log("toString", Object.prototype.toString.call(Proxy))

log("Proxy.prototype:", Proxy.prototype)

log("proxy instanceof Proxy:", proxy instanceof Proxy) 