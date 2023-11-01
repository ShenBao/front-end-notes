
const fnStr = `console.log("name:", name)`

global.name = "global的name"

var obj = {
    test() {
        var name = "test的name";
        const fn = new Function(fnStr);
        fn();
    },
    testEval() {
        var name = "testEval的name";
        const fn = eval(`(function() {${fnStr}})`)
        fn();
    }
}

obj.test();
obj.testEval();