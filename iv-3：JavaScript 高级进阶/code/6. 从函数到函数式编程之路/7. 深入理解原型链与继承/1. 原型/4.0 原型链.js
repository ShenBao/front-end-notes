function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function () {
    return this.name;
}
Person.prototype.getAge = function () {
    return this.age
}

var person = new Person();

var log = console.log;
log(person.__proto__ ===  Person.prototype);
log(Person.prototype.__proto__ ===  Object.prototype);
log(Object.prototype.__proto__ ===  null);
