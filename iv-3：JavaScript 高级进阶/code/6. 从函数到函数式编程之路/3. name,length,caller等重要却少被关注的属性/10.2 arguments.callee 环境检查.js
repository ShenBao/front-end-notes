var global = this;

var test = function (recursed) {
    console.log("this:", this);
    if (!recursed) { return arguments.callee(true); }
    if (this !== global) {
        console.log("This is: " + this);
    } else {
        console.log("This is the global");
    }
}

test();