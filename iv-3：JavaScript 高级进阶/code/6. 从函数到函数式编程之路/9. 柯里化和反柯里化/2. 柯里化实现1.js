
var slice = Array.prototype.slice;
var curry = function (fn) {
    var args = slice.call(arguments, 1)
    return _curry.apply(this, [fn, fn.length].concat(args))
};

function _curry(fn, len) {
    var oArgs = slice.call(arguments, 2);
    return function () {
        var args = oArgs.concat(slice.call(arguments));
        if (args.length >= len) {
            return fn.apply(this, args);
        } else {
            return _curry.apply(this, [fn, len].concat(args))
        }
    }
}


//使用
function calcSum(num1, num2 = 2, num3) {
    return num1 + num2 + num3;
}
const calcSumCurry = curry(calcSum, 3);

const log = console.log;
log(calcSumCurry(4, 5));
log(calcSumCurry(4)(5));
