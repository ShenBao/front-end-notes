Function.prototype.unCurry = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}
