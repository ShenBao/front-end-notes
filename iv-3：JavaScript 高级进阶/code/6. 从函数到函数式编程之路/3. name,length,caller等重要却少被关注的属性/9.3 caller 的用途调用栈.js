function getStack(fn) {
    const stacks = [];
    let caller = fn.caller;
    while (caller) {
        stacks.unshift(caller.name);
        caller = caller.caller;
    }
    return stacks;
}

function a() {
    console.log("a")
    const stacks = getStack(a);
    console.log("stacks:", stacks);
}

function b() {
    a();
    console.log("b");
}


function c() {
    b();
    console.log("c")
}


c();

