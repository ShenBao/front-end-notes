const symbolIsAnimal = Symbol.for("pro_symbol_attr_isAnimal");
const symbolSay = Symbol.for("pro_symbol_method_say");
const symbolSalary = Symbol.for("ins_symbol_attr_salary");

function Person(age, name){
    this.ins_in_attr_age = age;
    this.ins_in_attr_name = name;

    this.ins_in_method_walk = function () {
        console.log("ins_method_walk");
    }
}


// 原型方法
Person.prototype.pro_method_say = function(words){
    console.log("pro_method_say:", words);
}
Person.prototype[symbolSay] = function(words){
    console.log("pro_symbol_method_say", words);
}


// 原型属性
Person.prototype[symbolIsAnimal] = true;
Person.prototype.pro_attr_isAnimal = true;

const person = new Person(100, "程序员");

    //Symbol 属性
person[symbolSalary] = 6000;
person["ins_no_enumerable_attr_sex"] = "男";


// sex 不可枚举
Object.defineProperty(person, "ins_no_enumerable_attr_sex", {
    enumerable: false
});

Object.defineProperty(person, symbolSalary, {
    enumerable: false, // 无效的设置 
    value: 999
});
