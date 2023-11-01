
const keys = ["random","sum", "unique"];


// const proxyTestObject = new OProxyTestObject();

// const proxyTestObject = new DynamicProxy(TestObject);
// proxyTestObject.inject(keys);


const proxyTestObject = new DefineP(keys);

const sumArr = Array.from({ length: 99999 }, (v, k) => {
    return k
});

const baseArr = Array.from({ length: 99999 }, (v, k) => {
    return {
        id: k
    }
});
const uniqueArr = [baseArr, [{
    id: 11
}, {
    id: 12
}], baseArr, [{
    id: -14
}], baseArr]






