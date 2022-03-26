function minHp(minValue) {
    return function (target, propertyKey, descriptor) {
        const oriSet = descriptor.set;
        descriptor.set = function (value) {
            if (value <= minValue) {
                return;
            }
            oriSet.call(this, value);
        }
    };
}

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

    @minHp(0)
    set hhp(value) {
        this.hp = value;
    }
}

var p1 = new Man("金刚侠", 5);
p1.hhp = 10;
console.log("hp", p1.hp);
p1.hhp = -10;
console.log("hp", p1.hp);
