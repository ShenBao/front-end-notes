// "use strict"

var isStrict = (function () {
    return this === undefined;
}());

function test() {
    "use strict"
    console.log("isStrict:", isStrict)
    console.log(arguments.callee);
}

console.log(test.toString())