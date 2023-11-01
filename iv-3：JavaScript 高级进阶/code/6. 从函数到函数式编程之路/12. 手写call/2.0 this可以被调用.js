
// 浏览器中执行
var obj = Object.create(Function.prototype)

Function.prototype.call = function (context) {
    context = (context == null || context == undefined) ? window : new Object(context);
    context.fn = this;

    console.log("this", typeof this);
    return;
    var arr = [];
    for (var i = 1; i < arguments.length; i++) {
        arr.push('arguments[' + i + ']');
    }
    var r = eval('context.fn(' + arr + ')');
    delete context.fn;
    return r;
}

obj.call({})