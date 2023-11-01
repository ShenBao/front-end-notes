var Person = function (name) {
    this.name = name;
}



console.log("Person.prototype:", Person.prototype);

console.log("Person.prototype.__proto__:", Person.prototype.__proto__);


console.log("原型链次顶层是否是Object.prototype:", Person.prototype.__proto__ === Object.prototype);

console.log("原型链顶层:", Person.prototype.__proto__.__proto__);