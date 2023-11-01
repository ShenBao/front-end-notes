var revocable = Proxy.revocable({
    name: "person"
}, {
    get(target, propertyKey, receiver) {
       return Reflect.get(target, propertyKey, receiver)
    }
});
var proxy = revocable.proxy;
console.log("proxy.name:", proxy.name); // "person"

revocable.revoke();
console.log("typeof proxy", typeof proxy) // "object"，

// TypeError: Cannot perform 'get' on a proxy that has been revoked
console.log("proxy.name:", proxy.name); 
proxy.name = 1           // 还是 TypeError
delete proxy.name;       // 又是 TypeError
