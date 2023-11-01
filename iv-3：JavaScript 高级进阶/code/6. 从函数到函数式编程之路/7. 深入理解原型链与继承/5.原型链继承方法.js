




function extendsFn(superFn, constructorFn) {
    // 创建新构造函数
    function F() { };
    // 构造函数.prototype 执行 继承对象（父对象）的原型
    F.prototype = superFn.prototype;
    // 创建新的原型对象，f1.__proto__也就指向了 继承对象（父对象）的原型
    var f1 = new F();
    // 有了原型对象，我们要把原型对象的构造指回 我们自己的构造（子构造）
    f1.constructor = constructorFn;
    // 原型对象操作完毕以后，那我们就需要修改下 我们构造函数（子构造）的 prototype 指向 我们新建的原型对象即可。
    constructorFn.prototype = f1;
}
