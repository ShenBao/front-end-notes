const { methodReadonly } = require("./equipUtils1");

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

    @methodReadonly
    toString() {
        return `${this.name}的血量:${this.hp}`
    }

    run() {
        console.log("跑步");
    }
}

var p1 = new Man("金刚侠", 5);
console.log(p1.toString());

p1.toString = function () {
    return "1111";
}

console.log(p1.toString());