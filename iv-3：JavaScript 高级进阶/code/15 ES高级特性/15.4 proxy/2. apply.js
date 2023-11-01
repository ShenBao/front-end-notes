function sum(num1, num2) {
  return num1 + num2;
}

const proxySum = new Proxy(sum, {
  apply(target, thisArg, argumentsList) {
    console.log("target:", target);
    console.log("thisArg:", thisArg);
    console.log("argumentsList:", argumentsList);
    return Reflect.apply(target, thisArg, argumentsList);
  }
});

// 正常调用 proxy(...arguments)
console.log("proxySum():", proxySum(0, -1));
console.log();

// call
console.log("proxySum.call:", proxySum.call(null, 1, 2));
console.log();
// apply
console.log("proxySum.apply:", proxySum.apply(undefined, [3, 4]));
console.log();
// Reflect.apply
console.log("Reflect.apply:", Reflect.apply(proxySum, {}, [5, 6]));
console.log();
