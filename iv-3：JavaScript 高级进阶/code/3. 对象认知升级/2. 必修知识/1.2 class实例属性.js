
//2 class 实例对象
class Person {
    constructor(name, age){
        this.name = name
        this.age = age
    }
    
    getName = ()=> {
        return this.name
    }
    
    getAge(){
        return this.age
    }
}

const hasOwn = Object.hasOwnProperty;
const print = console.log;

var person = new Person();
print("getName:", hasOwn.call(person,"getName"))
print("getAge:", hasOwn.call(person,"getAge"))