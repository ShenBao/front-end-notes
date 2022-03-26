const {catchGetter} = require("./createErrorCatch.js");

class Test {

    price = 100;
    count=20;


    @catchGetter({ message: "计算价格失败", toast: true })
    get totalPrice() {
        throw new Error("A");
        return this.price * this.count;
    }
        
}

const test=new Test();
console.log(test.totalPrice);