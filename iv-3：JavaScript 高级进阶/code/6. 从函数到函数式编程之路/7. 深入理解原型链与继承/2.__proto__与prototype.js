var Person=function (name) {
    this.name=name;
}

var p1 = new Person("张三");


console.log(p1);

console.log(p1.__proto__);

console.log(Person.prototype);


console.log(Person.prototype === p1.__proto__);

