const symbolSay = Symbol.for("say1");

class Person { 
    static flag = "人";
    static getFlag() {
        return Person.flag;
    }

    static [Symbol.for("symbolPro")](){
        return "symbolPro"
    }

    constructor(name) {
        this.name = name;
        this[symbolSay] = "haha";
    }
    getName() {
        return this.name;
    }
    getAge = () => {
        return 15;
    }
}


function getOwnPropertyStatics(_obj) {
    const KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
    };

    let result = [];

    let keys = Object.getOwnPropertyNames(_obj);
    keys = keys.concat(Object.getOwnPropertySymbols(_obj));
    // const keys = Reflect.ownKeys(_obj)
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!KNOWN_STATICS[key]) {
            result.push(key)
        }
    }
    return result;
}


const staticProps = getOwnPropertyStatics(Person);
console.log("静态属性:", staticProps);