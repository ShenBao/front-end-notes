
class Animal{
    constructor(){
        this.name = "animal"
    }

    eat(){
        console.log("eat");
    }

    get gname(){
        return  "getter name"
    }
}
Animal.prototype.name = "prototype的name";

class Person extends Animal{
}

var person = new Person();
console.log(person.name);
console.log(person.gname);
console.log(person.__proto__.eat);
console.log(person.__proto__.name);