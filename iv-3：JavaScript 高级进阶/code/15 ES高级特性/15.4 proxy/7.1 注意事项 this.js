
var obj = {};

const handler = {
    get(target, property, receiver) {
        console.log("get: this === handler:", this === handler);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        console.log("set: this === handler:",this === handler);
        return Reflect.set(target, property, value, receiver);
    }
}

var proxyObj = new Proxy(obj, handler);

// 设置属性
proxyObj.name = 1;
// 读取属性
console.log("proxyObj.name", proxyObj.name)