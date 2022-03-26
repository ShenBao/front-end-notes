Number.isNaN = function (params) {
    if (typeof params === "number") {
        return isNaN(params);
    }
    return false;
}

function ToIntegerOrInfinity(argument) {
    var num = Number(argument);
    // + 0 和 -0
    if ((Number.isNaN(num)) || num == 0) {
        return 0
    }
    if (num === Infinity || num == -Infinity) {
        return num
    }
    var inter = Math.floor(Math.abs(num));
    if (num < 0) {
        inter = -inter
    }
    return inter;
}

Array.prototype.includes = function (item, fromIndex) {

    // call, apply调用，严格模式
    if (this == null) {
        throw new TypeError('无效的this');
    }
    var O = Object(this);

    var len = O.length >> 0;
    if (len <= 0) {
        return false;
    }

    var n = ToIntegerOrInfinity(fromIndex);
    if (fromIndex === undefined) {
        n = 0;
    }
    if (n === +Infinity) {
        return false;
    }
    if (n === -Infinity) {
        n = 0;
    }

    var k = n >= 0 ? n : len + n;
    if (k < 0) {
        k = 0
    }

    const isNAN = Number.isNaN(item);
    for (let i = k; i < len; i++) {
        if (O[i] === item) {
            return true;
        } else if (isNAN && Number.isNaN(O[i])) {
            return true;
        }
    }
    return false;
};


const arr = ['a', 'b', 'c'];
console.log("arr include -100->0:", arr.includes('c', -100));
console.log("arr include -100->0:", arr.includes('a', -1));
console.log("arr include 1:", arr.includes('a', -Infinity));
console.log("arr include 1:", arr.includes('a', Infinity));