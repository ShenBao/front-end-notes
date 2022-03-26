const proto = {
    name: 'proto name',
    age: 18,
    get nameValue() {
        return this.name;
    },
};

const proxyObj = new Proxy(proto, {
    get(target, property, receiver) {
        console.log("receiver === proxyObj", receiver === proxyObj);
        console.log("receiver === obj", receiver === obj);
        // 相当于 target[property]
        return Reflect.get(target, property);

        // 相当于 receiver[property]
        // return Reflect.get(target, property, receiver);
    },
});


const obj = {
    name: 'obj name',
    age: 10,
};

// 设置原型
Object.setPrototypeOf(obj, proxyObj);
// proxyObj.nameValue receiver === proxyObj
console.log("proxyObj.nameValue:", proxyObj.nameValue);
console.log("")
// obj.nameValue, obj不存在，访问原型链上的方法，所以触发捕获器
// 期望获取的是对象上的属性，而不是原型上的
// receiver === obj
console.log("obj.nameValue:", obj.nameValue);
console.log("")
// proxyObj.age
console.log("proxyObj.age:", proxyObj.age);
console.log("")
// obj.age
console.log("obj.age:", obj.age);
