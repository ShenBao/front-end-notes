function Person(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function () {
        return this.name;
    }
    this.getAge = function () {
        return this.age
    }
}

var person = new Person();
var person2 = new Person();

console.log(person.getName === person2.getName)