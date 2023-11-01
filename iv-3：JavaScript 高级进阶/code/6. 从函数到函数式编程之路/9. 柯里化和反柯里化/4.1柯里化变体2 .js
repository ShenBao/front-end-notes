
var slice = Array.prototype.slice;
var curry = function (fn, length) {
    var args = slice.call(arguments, 2)
    return _curry.apply(this, [fn, length || fn.length].concat(args))
};

function _curry(fn, len) {
    var oArgs = slice.call(arguments, 2);
    return function () {
        var args = oArgs.concat(slice.call(arguments));
        if (arguments.length === 0) {
            if (args.length >= len) {
                return fn.apply(this, args);
            }
            return console.warn("curry:参数长度不足",);
        } else {
            return _curry.apply(this, [fn, len].concat(args))
        }
    }
}

function calcSum() {
    return [...arguments].reduce((pre, value, index) => { return pre + value }, 0);
}

const fn = curry(calcSum, 5);
console.log("执行添加:", fn(2, 3)(5)());
console.log("手动调用:", fn())