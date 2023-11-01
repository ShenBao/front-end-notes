const TestObject = require("./TestObject");

// ES5 + defineProperty 
function DefineP(Constructor, keys) {
    keys.forEach(p => {
        const method = Constructor.prototype[p];
        Object.defineProperty(Constructor.prototype, p, {
            value() {
                const startTime = Date.now();
                const result = Reflect.apply(method, this, arguments)
                const endTime = Date.now();
                console.log("defineProperty cost:", p, startTime, endTime, endTime - startTime);
                return result;
            }
        })
    })
}



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
}], baseArr];

// 初始化
DefineP(TestObject, ['random', 'sum', 'unique']);
const proxyTestObject = new TestObject();

const result = proxyTestObject.random(10, 1000);
console.log("random:", result);
const sumValue = proxyTestObject.sum(sumArr);
console.log("sum:", sumValue);
const uniqueValue = proxyTestObject.unique("id", ...uniqueArr)
console.log("unique:", uniqueValue.length);
