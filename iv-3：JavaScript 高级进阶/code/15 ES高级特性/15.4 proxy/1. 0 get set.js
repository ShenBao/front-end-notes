
var obj = {};
var proxyObj = new Proxy(obj, {
    get(target, property, receiver) {
        console.log("get:=============== ");
        console.log("target:", target);
        console.log("property:", property);
        console.log("receiver:", receiver);
        console.log("target === obj:", target === obj);
        console.log("receiver === proxyObj:", receiver === proxyObj);
        console.log(" ");
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        console.log("set:=============== ");
        console.log("target:", target);
        console.log("property:", property);
        console.log("value:", value);
        console.log("receiver:", receiver);
        console.log("target === obj:", target === obj);
        console.log("receiver === proxyObj:", receiver === proxyObj);
        console.log("");
        return Reflect.set(target, property, value, receiver);
    }
});

// 设置属性
proxyObj.name = "name";
// 读取属性
console.log("proxyObj.name:", proxyObj.name)
console.log("obj.name:", obj.name)