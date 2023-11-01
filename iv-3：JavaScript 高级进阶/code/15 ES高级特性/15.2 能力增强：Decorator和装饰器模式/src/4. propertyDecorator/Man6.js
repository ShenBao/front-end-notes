
function propertyReadonly(target, propertyName, direction) {
    console.log(target, "====", propertyName, "===", direction);
    direction.writable = false;
}


class Man {
    @propertyReadonly name = 'default name'

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}


const p1 = new Man();
console.log(p1.getName());
p1.setName("haha");  //报错： Cannot assign to read only property 'name' of object 
console.log(p1.getName()); 
