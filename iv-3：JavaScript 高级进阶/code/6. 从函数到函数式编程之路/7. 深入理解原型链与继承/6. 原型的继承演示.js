var Father = function () {
    this.attr = "父亲";
    this.bankCard = [1000];
};

Father.prototype.eat = function (params) {
    return `${this.name}吃${params}`;
}


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



var Child = function (name) {
    this.name = name;
    this.attr = "儿子";
}

extendsFn(Father, Child);


Child.prototype.run = function () {
    return `${this.name}正在跑步`;
};

var p1 = new Child("张三");

console.log("p1.__proto__:", p1.__proto__);
console.log("Child.prototype:", Child.prototype);

console.log("p1.name:", p1.name);

console.log("p1.run:", p1.run())

console.log("p1.attr:", p1.attr)

console.log("p1.eat:", p1.eat("鲍鱼"));



var p2 = new Child("李四");

console.log("p2.name", p2.name);

console.log("p2.run:", p2.run())

console.log("p2.attr:", p2.attr)

console.log("p2.eat:", p2.eat("雁翅"));


var a1 = new Father();

console.log("a1.attr:", a1.attr);
console.log("a1.bankCard:", a1.bankCard);
console.log("a3.eat:", a1.eat("馒头"))
