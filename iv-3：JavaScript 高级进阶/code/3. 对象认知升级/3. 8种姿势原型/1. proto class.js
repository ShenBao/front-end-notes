class Person {
    // 私有属性
    #canTalk = true
    // 静态属性
    static isAnimal = true;

    constructor(name, age) {
        // 实例属性
        this.name = name;
        // 实例属性
        this.age = age
    }

    // 原型属性
    sayName() {
        console.log(this.name);
    }
}