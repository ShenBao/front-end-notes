const getType = val => Object.prototype.toString.call(val);
function getPrototypeChains(instance) {
    const chains = [];
    let proto = instance.__proto__;
    chains.push(getType(proto));
    while (proto) {       
        proto = proto.__proto__
        chains.push(getType(proto));
    }
    return chains;
}

const print = console.log;
print(getPrototypeChains(Function));
print(getPrototypeChains(Object));
