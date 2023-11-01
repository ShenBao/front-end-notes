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
var person2 = new Person();

console.log(person.getName === person2.getName)