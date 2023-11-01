Function.prototype.unCurry = function () {
    return this.call.bind(this);
};

