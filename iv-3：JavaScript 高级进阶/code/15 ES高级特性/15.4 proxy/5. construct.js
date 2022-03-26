const handler = {
    // 拦截new 操作符
    // new proxy(...args)
    // Reflect.construct()
    construct(target, argumentsList, newTarget) {
        console.log('construct:', target.name);
        return Reflect.construct(target, argumentsList, newTarget);
    }
};

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function () {
    return this.name;
}

class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return this.name;
    }
}

var proxyFun = new Proxy(Person, handler);
var proxyClass = new Proxy(PersonClass, handler);

console.log("ProxyFun:", new proxyFun("小红", 18));
console.log("")
console.log("proxyClass:", new proxyClass("小明", 12));
