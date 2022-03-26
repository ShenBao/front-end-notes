Function.prototype.unCurry = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}
Function.prototype.unCurry = function () {
    return this.call.bind(this);
};
Function.prototype.unCurry = function () {
    return (...args) => this.call(...args)
};

