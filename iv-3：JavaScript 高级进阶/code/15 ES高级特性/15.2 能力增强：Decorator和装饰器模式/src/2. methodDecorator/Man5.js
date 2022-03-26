const { methodDecorator } = require("./equipUtils1");


class Man {
    name = "";
    hp = 0;
    constructor(name, hp = 3) {
        this.init(name, hp);
    }

    @methodDecorator(50)
    init(name, hp) {
        console.log("调用==", this, name, hp)
        this.name = name;
        this.hp = hp;
    }

    run() {
        console.log("跑步");
    }
}

var p1 = new Man("金刚侠", 5);
console.log("p1 的血量:", p1);
