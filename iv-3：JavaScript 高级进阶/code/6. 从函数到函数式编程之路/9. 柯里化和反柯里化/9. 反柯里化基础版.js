function unCurry(fn) {
    return function (context) {
        return fn.apply(context, Array.prototype.slice.call(arguments, 1));
    }
}
