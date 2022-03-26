
function CheckType(type){
    return function (target, name, descriptor){
        console.log("descriptor.initializer:",  descriptor.initializer.toString());
        let value = descriptor.initializer && descriptor.initializer.call(this);

        return {
            enumerable: true,
            configurable: true,
            get: function() {
                return value;
            },
            set: function(c) {
                var cType = typeof c ==type;
                if(cType){
                    value = c;
                }
            }
        }
    }
}

class Man {
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

