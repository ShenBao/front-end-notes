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
    var isStrict = isStrictMode();

    if (!hasStrictMode || (hasStrictMode && !isStrict)) {
        return (context === null || context === void 0) ? getGlobal() : Object(context);
    }
    // 严格模式下, 妥协方案
    return Object(context);
}


function createFun(argsLength) {

    // return ctx[propertyName](arg1, arg2, arg3,...)
    // 拼接函数
    var code = 'return ctx[propertyName](';

    // 拼接参数, 第二个起是参数
    for (var i = 0; i < argsLength; i++) {
        if (i > 0) {
            code += ',';
        }
        code += 'args[' + i + ']';
    }
    code += ')';

    return new Function('ctx', 'propertyName', 'args', code);
}

Function.prototype.call = function (context) {

    // 不可以被调用
    if (typeof this !== 'function') {
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

    var argArr = [];
    var len = arguments.length;
    for (var i = 1; i < len; i++) {
        argArr[i - 1] = arguments[i];
    }

    var r = createFun(len - 1)(ctx, propertyName, argArr);

    // 还原现场
    if (hasOriginVal) {
        ctx[propertyName] = originVal;
    } else {
        delete ctx[propertyName]
    }
    return r;
}

function getName() {
    console.log(this.name, arguments[0], arguments[1]);
}

getName.call({ name: "哈哈" }, 1, 2)
// 哈哈 1 2