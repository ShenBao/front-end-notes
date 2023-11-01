function sum(num1, num2) {
    return num1 + num2;
}

const proxySum = new Proxy(sum, {
    apply(target, thisArg, argumentsList) {
        return Reflect.apply(target, thisArg, argumentsList);
    }
});

console.log("typeof proxySum:", typeof proxySum);
console.log("toString proxySum:", Object.prototype.toString.call(proxySum))
