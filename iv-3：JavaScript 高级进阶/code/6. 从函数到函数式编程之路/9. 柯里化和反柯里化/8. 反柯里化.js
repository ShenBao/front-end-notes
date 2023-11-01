function unCurry(fn) {
    return function (context) {
        return fn.apply(context, Array.prototype.slice.call(arguments, 1));
    }
}

// 不使用反柯里化
Object.prototype.toString.call({});

// 反柯里化
const toString = unCurry(Object.prototype.toString);
toString({});
toString(() => { });
toString(1);

