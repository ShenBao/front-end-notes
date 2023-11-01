
function sum(num1, num2) {
    return num1 + num2;
}

const proxySum = new Proxy(sum, {
    apply(target, thisArg, argumentsList) {
        const num1 = argumentsList[0];
        const num2 = argumentsList[1];

        if (typeof num1 !== 'number') {
            throw new TypeError('num1 must be a number')
        }
        if (typeof num2 !== 'number') {
            throw new TypeError('num2 must be a number')
        }
        return Reflect.apply(target, thisArg, argumentsList)
    }
})

console.log("3 + 9:", proxySum(3, 9))
console.log("3 + undefined:",proxySum(3));
