//1. 函数作为构造实例
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

var person = new Person();

