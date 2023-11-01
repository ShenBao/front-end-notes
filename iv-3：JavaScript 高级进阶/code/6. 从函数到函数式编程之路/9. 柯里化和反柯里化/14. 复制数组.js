Function.prototype.unCurry = function () {
    const self = this
    return function () {
        return Function.prototype.call.apply(self, arguments)
    }
}

const clone = Array.prototype.slice.unCurry();

var a = [1, 2, 3];

var b = clone(a);

console.log("a==b:", a === b);
console.log(a, b);

