
function partial(fn) {
    const args = [].slice.call(arguments, 1);
    return function () {
        const newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};


function calcSum(num1, num2, num3) {
    return num1 + num2 + num3;
}
const pCalcSum = partial(calcSum, 10);

console.log(pCalcSum(11, 12));
