//类数组的特征
var maxSafeInteger = Math.pow(2, 32) - 1;

var ToIntegerOrInfinity = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};

var ToLength = function (value) {
    var len = ToIntegerOrInfinity(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
};

var isCallable = function (fn) {
    return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
};

Array.from = function (arrayLike, mapFn, thisArg) {

    var C = this;

    //判断对象是否为空
    if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    //检查mapFn是否是方法
    if ((typeof mapFn !== 'function') && (typeof mapFn !== 'undefined')) {
        throw new TypeError(mapFn + 'is not a function')
    }

    var items = Object(arrayLike);
    //判断 length 为数字，并且在有效范围内。
    var len = ToLength(items.length);
    if (len <= 0) return [];

    var A = isCallable(C) ? Object(new C(len)) : new Array(len);

    for (var i = 0; i < len; i++) {
        var value = items[i];
        if (mapFn) {
            A[i] = typeof thisArg === 'undefined' ? mapFn(value, i) : mapFn.call(thisArg, value, i);
        } else {
            A[i] = value;
        }
    }
    return A;
}

// console.log("Array.from:", Array.from({ a: 1, length: "10" }));
// console.log("Array.from:", Array.from({ a: 1, length: "ss" }));

// console.log("Array.from:", Array.from({ 0: 1, 1: 2, 4: 5, length: 4 }, x => x + x));


function MyArray(length) {
    const len = length * 2
    return new Array(len)
}

function MyObject(length) {
    return {
        length
    }
}

console.log("Array.from:MyArray", Array.from.call(MyArray, { length: 5 }))

console.log("Array.from:MyObject", Array.from.call(MyObject, { length: 5 }))


