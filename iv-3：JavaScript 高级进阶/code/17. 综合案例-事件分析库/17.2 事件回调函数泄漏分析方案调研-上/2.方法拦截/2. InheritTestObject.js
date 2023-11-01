const TestObject = require("./TestObject");
//继承方式
class InheritTestObject extends TestObject{

    sum(arr) {
        return this._invoke("sum", arguments);
    }

    unique(key, ...arrs) {
        return this._invoke("unique", arguments);
    }


    random(min, max) {
        return this._invoke("random", arguments);
    }


    _invoke(method, args) {
        const startTime = Date.now();
        const result = super[method].apply(this, args);
        const endTime = Date.now();
        console.log(`继承-cost: ${method}`, startTime, endTime, endTime - startTime);
        return result;
    }
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

const proxyTestObject = new InheritTestObject();
const result = proxyTestObject.random(10, 1000);
console.log("random:", result);
const sumValue = proxyTestObject.sum(sumArr);
console.log("sum:", sumValue);
const uniqueValue = proxyTestObject.unique("id", ...uniqueArr)
console.log("unique:", uniqueValue.length);
