const {classDecorator1, classDecorator2, methodDecorator1,methodDecorator2,propertyDecorator1,propertyDecorator2} = require("./DecoratorUtils");


@classDecorator1()
@classDecorator2()
class Man {
    
    constructor(name, hp = 3) {
        this.init(name, hp);
    }

    init(name, hp) {
        this.name = name;
        this.hp = hp;
    }
    //故意放在最后，测试顺序
    @propertyDecorator1()
    @propertyDecorator2()
    name = "";

    @methodDecorator1()
    @methodDecorator2()
    run() {
        console.log("跑步");
    }

    hp = 0;
}

const p2 = new Man("钢铁侠1版", 5);
