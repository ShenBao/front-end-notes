
function Person(name) {
    this.name = name;

    this.getName = function () {
        return this.name;
    }
}

var person = new Person("二哈");
console.log(person.getName())