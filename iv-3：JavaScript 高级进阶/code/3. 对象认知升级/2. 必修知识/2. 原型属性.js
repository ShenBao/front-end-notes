//原型属性
function Person(name, age){    
    this.name = name;
    this.age = age;
    this.getName = function(){
        return name
    }
}

Person.prototype.getAge = function(){
    return this.age;
}



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