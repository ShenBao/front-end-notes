
function Animal(options) {
    this.age = options.age || 0;
    this.sex = options.sex || 1;
    this.testProperties = [1, 2, 3]
}

Animal.prototype.eat = function (something) {
    console.log("eat:", something);
}

function Person(options) {
    // 初始化父类, 独立各自的属性
    Animal.call(this, options);
    this.name = options.name || "";
}

// 设置原型
Person.prototype = Object.create(Animal.prototype);
// 修复构造函数
Person.prototype.constructor = Person;

Person.prototype.eat = function eat(something) {
    console.log(this.name, ":is eating", something)
}
Person.prototype.walk = function walk() {
    console.log(this.name, ":is waking")
}

var person = new Person({ sex: 1, age: 18, name: "小红" });
person.eat("大米");
person.walk();

person.testProperties.push("4")

var person2 = new Person({ sex: 1, age: 18, name: "小红" });
console.log(person2.testProperties)