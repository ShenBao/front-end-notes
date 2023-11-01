var Person=function (name) {
    this.name=name;
}

console.log(Person.__proto__);

console.log(Person.__proto__ === Function.prototype);


console.log(Function.__proto__ === Function.prototype);