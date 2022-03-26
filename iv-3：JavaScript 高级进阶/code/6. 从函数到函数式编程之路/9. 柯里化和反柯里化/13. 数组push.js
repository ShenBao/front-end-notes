Function.prototype.unCurry = function () {
    const self = this
    return function () {
        return Function.prototype.call.apply(self, arguments)
    }
}


const push = Array.prototype.push.unCurry();
const arr = [1, 2, 3];
const obj = {};
push(obj, 4, 5, 6);
console.log(obj);