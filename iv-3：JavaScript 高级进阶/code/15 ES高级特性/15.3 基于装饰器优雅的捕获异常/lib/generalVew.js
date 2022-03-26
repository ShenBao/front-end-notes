const { catchGetter, catchMethod, catchInitializer } = require("./createErrorCatch.js");
const { CatchError } = require("../CatchError");


function delay(delay = 5000, fn = () => { }, context = null) {
    let ticket = null;
    return {
        run(...args) {
            return new Promise((resolve, reject) => {
                ticket = setTimeout(async () => {
                    try {
                        const res = await fn.apply(context, args);
                        resolve(res);
                    } catch (err) {
                        reject(err);
                    }
                }, delay);
            });
        },
        cancel: () => {
            clearTimeout(ticket);
        }
    };
}

class TestDemo {

    price = 100;
    count = 20;

    constructor() {
        this.onIncrease = this.onIncrease.bind(this);
        this.onDecrease = this.onDecrease.bind(this);
    }


    @catchMethod({ message: "printSomething error", toast: true })
    static printSomething() {
        throw new CatchError("printSomething error: 主动抛出");
        console.log("printSomething:", Date.now());
    }

    @catchMethod({ message: "asyncPrintSomething error", toast: true })
    static async asyncPrintSomething() {
        const { run } = delay(1000, () => {
            console.log("asyncPrintSomething")
        });
        await run();
        throw new CatchError("asyncPrintSomething error: 主动抛出");
        console.log("asyncPrintSomething:", Date.now());
    }

    @catchGetter({ message: "计算价格失败", toast: true })
    get totalPrice() {
        throw new Error("A");
        return this.price * this.count;
    }

    @catchMethod("增加数量失败")
    async onIncrease() {
        const { run } = delay(1000, () => {
            console.log("onIncrease")
        });
        await run();
        throw new CatchError("method async error: 主动抛出");
    }

    @catchMethod("减少数量失败")
    onDecrease() {
        console.log("onDecrease");
        throw new CatchError("method error: 主动抛出");
    }

    @catchInitializer({ message: "catchInitializer error", toast: true })
    doSomethings = () => {
        console.log("do some things");
        throw new CatchError("catchInitializer error: 主动抛出");
    }

    @catchInitializer({ message: "catchInitializer async error", toast: true })
    asyncDoSomethings = async () => {
        const { run } = delay(1000, () => {
            console.log("执行asyncDoSomethings")
        });
        await run();
        throw new CatchError("catchInitializer async error: 主动抛出");
    }
}


//static 
TestDemo.printSomething();
TestDemo.asyncPrintSomething();


const t1 = new TestDemo();
//catchInitializer
t1.doSomethings();
t1.asyncDoSomethings();

//catchMethod
t1.onIncrease();
t1.onDecrease();

//getter
console.log(t1.totalPrice)