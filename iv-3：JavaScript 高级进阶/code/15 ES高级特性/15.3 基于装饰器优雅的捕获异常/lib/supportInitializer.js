const {catchInitializer} = require("./createErrorCatch.js");

class Test {


    @catchInitializer("nono")
    doSomethings = ()=> {
        throw Error("doSomethings error")
    }
    
}

const test=new Test();
test.doSomethings();