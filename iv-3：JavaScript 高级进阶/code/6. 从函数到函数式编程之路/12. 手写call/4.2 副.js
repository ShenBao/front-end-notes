Function.prototype.call = function (context) {
    context = (context == null || context == undefined) ? window : new Object(context);
    context.fn = this;
    var arr = [];
    for (var i = 1; i < arguments.length; i++) {
        arr.push('arguments[' + i + ']');
    }
    var r = eval('context.fn(' + arr + ')');
    delete context.fn;
    return r;
}

var context = {
    fn: "i am fn",
    msg: "i am msg"
}
function log() {
 console.log("msg:", this.msg);
}
log.call(context);
console.log("fn:", context.fn); // fn: undedined