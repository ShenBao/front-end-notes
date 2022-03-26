
 function addFly(target) {
    console.log("target==",target)
    console.log("addFlay isFly");
    target.prototype.isFly = true;
}


@addFly
class Man {
    name = "";
    hp = 0;
    constructor(name, hp = 3) {
        this.init(name, hp);
    }

    init(name, hp) {
        this.name = name;
        this.hp = hp;
    }
}

const p1 = new Man("钢铁侠1版", 5);
console.log("p1 钢铁侠是否可飞:", p1.isFly);
