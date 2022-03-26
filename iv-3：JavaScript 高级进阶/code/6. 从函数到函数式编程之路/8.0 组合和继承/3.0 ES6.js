class Animal {
    constructor(options) {
        this.age = options.age || 0;
        this.sex = options.sex || 1;
    }

    eat(something) {
        console.log("eat:", something);
    }
}

class Person extends Animal {

    // 私有变量
    #friends = [];

    constructor(options) {
        super(options);
        this.name = options.name || name;
    }
    eat(something) {
        console.log(this.name, "eat:", something);
    }
    run() {
        return `${this.name}正在跑步`;
    };

    say = () => {
        console.log("say==", say);
    }
}

var p1 = new Person({name: "张三"});
console.log("name:", p1.name);
p1.eat("鲍鱼")
// console.log("p1.friends:", p1.friends, p1.#friends)
console.log(Object.getOwnPropertyNames(p1.__proto__));