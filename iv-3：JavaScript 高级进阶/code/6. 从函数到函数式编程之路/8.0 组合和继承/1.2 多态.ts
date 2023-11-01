
class Animal {
    eat(){
        console.log("Animal is eating")
    }
}

class Person extends Animal {
    eat(){
        console.log("Person is eating")
    }
}

var animal: Animal = new Animal();
animal.eat()

var person: Animal = new Person();
person.eat()

