var array = [1, 3,
    [4, 5],
    [6, [7, 8, [9, , 10]]], [, ,],
    [undefined, null, NaN]
];

var has = Object.prototype.hasOwnProperty;

var maxSafeInteger = Math.pow(2, 32) - 1;

var toInteger = function (value) {
    const number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};

var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
};

var push = Array.prototype.push;

Array.prototype.flat = function (deep) {
    var O = Object(this);
    var sourceLen = toLength(O.length);
    var depthNum = 1;
    if (deep !== undefined) {
        depthNum = toLength(deep)
    }
    if (depthNum <= 0) {
        return O;
    }
    var arr = [];

    var val;
    for (var i = 0; i < sourceLen; i++) {
        if (has.call(O, i)) {
            val = O[i];
            if (Array.isArray(val)) {
                push.apply(arr, val.flat(depthNum - 1));
            } else {
                arr.push(val);
            }
        } else {
            arr.push(undefined);
        }
    }

    return arr;
}

console.log(array.flat(2))