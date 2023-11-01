var Father = function () {
    this.attr = "父亲";
    this.bankCard = [1000];
};

Father.prototype.eat = function (params) {
    return `${this.name}吃${params}`;
}

Father.prototype.test = 1000;

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
    Father.call(this, ...arguments);
    this.name = name;
    this.attr = "儿子";
}

extendsFn(Father, Child);


Child.prototype.run = function () {
    return `${this.name}正在跑步`;
};

var p1 = new Child("张三");
p1.bankCard.push(20);

var p2 = new Child("李四");
p2.bankCard.push(30000);


console.log("p1.__proto__:", p1.__proto__);
console.log("Child.prototype:", Child.prototype);

console.log("p1.name:", p1.name, "=p1.backCard:", p1.bankCard);
console.log("p2.name:", p2.name, "=p2.backCard:", p2.bankCard);