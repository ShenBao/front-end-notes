function classDecorator(constructor) {
    return class extends constructor {
        hp = 8;
    }
}

@classDecorator
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

    run() {
        console.log("跑步");
    }
}

const p1 = new Man("钢铁侠3版", 5);
console.log(p1)
