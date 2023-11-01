const TestObject = require("./TestObject");


// ES6 + 标准代理
function ProxyTestObject() {

    var proxy = new Proxy(TestObject.prototype, {
        get(target, propKey) {
            const method = target[propKey];

            if (typeof method !== "function") {
                return method;
            }

            // 方式一
            return function () {
                const startTime = Date.now();
                const result = method.apply(this, arguments);
                const endTime = Date.now();
                console.log(`标准代理-cost: ${propKey}`, startTime, endTime, endTime - startTime);
                return result;
            }

            // 方式二
            // return new Proxy(method, {
            //     apply(t, ctx, args){
            //         const startTime = Date.now();
            //         const result = Reflect.apply(...arguments);
            //         const endTime = Date.now();
            //         console.log(`标准代理-cost: ${propKey}`, startTime, endTime, endTime - startTime);
            //         return result;
            //     }
            // })

        }
    })
    return proxy;
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
const proxyTestObject = new ProxyTestObject();


const result = proxyTestObject.random(10, 1000);
console.log("random:", result);
const sumValue = proxyTestObject.sum(sumArr);
console.log("sum:", sumValue);
const uniqueValue = proxyTestObject.unique("id", ...uniqueArr)
console.log("unique:", uniqueValue.length);
