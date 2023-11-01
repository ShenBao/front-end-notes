var hasStrictMode = (function () {
    "use strict";
    return this == undefined;
}());

var isStrictMode = function () {
    return this === undefined;
};

var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
};

function isFunction(fn) {
    return typeof fn === "function" || Object.prototype.toString.call(fn) === '[object Function]';
}

function getContext(context) {
    // 是否是严格模式
    var isStrict = isStrictMode();
    // 没有严格模式，或者有严格模式但不处于严格模式
    if (!hasStrictMode || (hasStrictMode && !isStrict)) {
        return (context === null || context === void 0) ? getGlobal() : Object(context);
    }

    // 严格模式下, 妥协方案
    return Object(context);
}

Function.prototype.call = function (context) {

    // 不可以被调用
    if (!isFunction(this)) {
        throw new TypeError(this + ' is not a function');
    }

    // 获取上下文
    var ctx = getContext(context);

    // 更为稳妥的是创建唯一ID, 以及检查是否有重名
    var propertyName = "__fn__" + Math.random() + "_" + new Date().getTime();
    var originVal;
    var hasOriginVal = isFunction(ctx.hasOwnProperty) ? ctx.hasOwnProperty(propertyName) : false;
    if (hasOriginVal) {
        originVal = ctx[propertyName]
    }

    ctx[propertyName] = this;

    // 采用string拼接
    var argStr = '';
    var len = arguments.length;
    for (var i = 1; i < len; i++) {
        argStr += (i === len - 1) ? 'arguments[' + i + ']' : 'arguments[' + i + '],'
    }
    var r = eval('ctx["' + propertyName + '"](' + argStr + ')');

    // 还原现场
    if (hasOriginVal) {
        ctx[propertyName] = originVal;
    } else {
        delete ctx[propertyName]
    }

    return r;
}

// 测试
function log(){
    console.log("name:", this.name);
}

log.call({name: "name"});