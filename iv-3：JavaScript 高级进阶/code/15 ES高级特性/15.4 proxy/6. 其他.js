const handler = {

    // 拦截修改属性描述符信息
    // Object.defineProperty()
    // Reflect.defineProperty()，
    // proxy.property='value'
    defineProperty(target, prop, descriptor) {
        console.log('handler:defineProperty');
        return Reflect.defineProperty(target, prop, descriptor);
    },

    // 拦截delete操作
    // delete proxy[property] 和 delete proxy.property
    // Reflect.deleteProperty()
    deleteProperty(target, prop) {
        console.log('handler:deleteProperty');
        return Reflect.deleteProperty(target, prop);
    },

    // 拦截获取属性描述符
    // Object.getOwnPropertyDescriptor()
    // Reflect.getOwnPropertyDescriptor()
    getOwnPropertyDescriptor(target, prop) {
        console.log('handler:getOwnPropertyDescriptor');
        return Reflect.getOwnPropertyDescriptor(target, prop)
    },

    // 拦截in
    // property in proxy
    // 继承属性查询: foo in Object.create(proxy)
    // with 检查: with(proxy) { (property); }
    // Reflect.has()
    has(target, prop) {
        console.log('handler:has');
        return Reflect.has(target, prop);
    },

    // Object.preventExtensions()
    // Reflect.preventExtensions()
    preventExtensions(target) {
        console.log('handler:preventExtensions');
        return Object.preventExtensions(target);
    },

    // Object.isExtensible()
    // Reflect.isExtensible()
    isExtensible(target) {
        console.log('handler:isExtensible');
        return Reflect.isExtensible(target);
        // return true; 也可以return 1;等表示为true的值
    },

    // Object.getOwnPropertyNames()
    // Object.getOwnPropertySymbols()
    // Object.keys()
    // Reflect.ownKeys()
    ownKeys(target) {
        console.log('handler:ownKeys');
        return Reflect.ownKeys(target);
    },
};

const obj = {
    name: "tom",
    age: 18,
    sex: 1
};
const proxyObj = new Proxy(obj, handler);

// defineProperty ，让name不可配置
Object.defineProperty(proxyObj, "name", {
    configurable: false,
})
console.log('\r\n');
//delete 尝试删除
console.log("delete proxyObj.name:", delete proxyObj.name, '\r\n');

// getOwnPropertyDescriptor
console.log("getOwnPropertyDescriptor", Object.getOwnPropertyDescriptor(proxyObj, "name"), '\r\n');

// has
console.log("name in proxyObj:", "name" in proxyObj, '\r\n');

// preventExtensions
Object.preventExtensions(proxyObj);
console.log();

console.log("proxyObj isExtensible:", Object.isExtensible(proxyObj), '\r\n');

// ownKeys
console.log("ownKeys:", Reflect.ownKeys(proxyObj), '\r\n');