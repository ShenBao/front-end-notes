
 function addFly(target) {
    console.log("addFly");
    target.prototype.isFly = true;
}


 function addFlyFun(flyHeight) {
    console.log("addFlyFun");
    return function (target) {
        console.log("addFlyFun 执行");
        target.prototype.fly = function () {
            console.log("飞行高度：", flyHeight);
        };
    };
}

 function addTransShape() {
    console.log("addTransShape");
    return function (target) {
        console.log("addTransShape 执行");
        target.prototype.isTransShape = true;
    };
}

@addTransShape()
@addFlyFun(300)
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

const p2 = new Man("钢铁侠1版", 5);
console.log();
console.log("p2 钢铁侠是否可飞:", p2.isFly);
console.log("p2 钢铁侠是否可以变形:",p2.isTransShape);
p2.fly();
