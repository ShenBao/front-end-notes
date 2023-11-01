function testTypeError() {
    // TypeError类型错误
    try {
        new eval();
        eval = function () {};
    } catch (err) {
        console.log("constructor TypeError", err.constructor == TypeError);
    }
}

function testError() {
    //Error
    try {
        throw new Error("哦豁，错误哦");
    } catch (err) {
        console.log("constructor Error", err.constructor == Error);
    }
}

testTypeError();
testError();