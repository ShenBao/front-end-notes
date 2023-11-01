
const { CheckType,SetString } = require("./DecoratorUtils");


class Man {
    @SetString()
    @CheckType("string")
    name = '钢铁侠'
    getName() {
        return this.name;
    }

    setName(name){
        this.name=name;
    }
}


const p1 = new Man();
p1.setName(55);
console.log("修改后的名字：",p1.getName());