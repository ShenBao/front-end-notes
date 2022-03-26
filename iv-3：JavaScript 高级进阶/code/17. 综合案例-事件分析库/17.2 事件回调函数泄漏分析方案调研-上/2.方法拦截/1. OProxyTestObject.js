
const TestObject = require("./TestObject");

// 简单重写原来的方法
function OProxyTestObject() {
    function _invoke(obj, method, args) {
        const startTime = Date.now();
        const result = Reflect.apply(method, obj, args);
        const endTime = Date.now();
        console.log(`简单代理-cost: ${method.name}`, startTime, endTime, endTime - startTime);
        return result;
    }

    var originSum = TestObject.prototype.sum;

    //重写原型方法
    TestObject.prototype.sum = function () {
        return _invoke(this, originSum, arguments);
    };

    var originRandom = TestObject.prototype.random;
    //重写原型方法
    TestObject.prototype.random = function () {
        return _invoke(this, originRandom, arguments);
    };

    var originUnique = TestObject.prototype.unique;

    //重写原型方法
    TestObject.prototype.unique = function () {
        return _invoke(this, originUnique, arguments);
    };

    return new TestObject(...arguments);
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
const proxyTestObject = new OProxyTestObject();


const result = proxyTestObject.random(10, 1000);
console.log("random:", result);
const sumValue = proxyTestObject.sum(sumArr);
console.log("sum:", sumValue);
const uniqueValue = proxyTestObject.unique("id", ...uniqueArr)
console.log("unique:", uniqueValue.length);
