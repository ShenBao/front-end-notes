class Father {
    shareAttr = 1000;
    constructor() {
        this.attr = "父亲";
        this.bankCard = [1000];
    }
    eat(params) {
        return `${this.name}吃${params}`;
    }

    say = () => {
        console.log("say==", say);
    }

}



class Child extends Father {
    constructor(name) {
        super();
        this.name = name;
        this.attr = "儿子";
    }
    run() {
        return `${this.name}正在跑步`;
    };
}


var p1 = new Child("张三");
p1.bankCard.push(20);

var p2 = new Child("李四");
p2.bankCard.push(30000);


console.log("p1.name:", p1.name, "=p1.backCard:", p1.bankCard, "=", p1.eat("鲍鱼"));
console.log("p2.name:", p2.name, "=p2.backCard:", p2.bankCard, "=", p2.eat("肉"));

console.log(p1.__proto__)