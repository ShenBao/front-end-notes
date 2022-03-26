function a() {
    console.log(this, 'a')
};
function b() {
    console.log(this, 'b')
}

// (a.call).call(b, 'b')

// 公式：fun.call(obj, ...args)  ===  (  obj.fun = fun; obj.fun(...args) )
// 1. 一个函数进行call调用，等同于在一个对象上执行该函数
// 等于在b对象上调用 a.call函数
// 2. a.call === Function.prototype.call
var call = Function.prototype.call;

// (a.call).call(b, 'b')
// call === a.call === Function.prototype.call;
// 等同于 在b调用call函数
b.fn = call;
b.fn('b');
b.call('b')
