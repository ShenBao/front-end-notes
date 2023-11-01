function curry(fn) {
    const curArgs = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, curArgs);
        }
        Array.prototype.push.apply(curArgs, [].slice.call(arguments));
        return arguments.callee;
    }
};
function calcSum() {
    return [...arguments].reduce((pre, value, index) => { return pre + value }, 0);
}
const fn = curry(calcSum);
console.log("执行添加:", fn(2, 3)(5)(8)());
// console.log("手动调用:", fn())

