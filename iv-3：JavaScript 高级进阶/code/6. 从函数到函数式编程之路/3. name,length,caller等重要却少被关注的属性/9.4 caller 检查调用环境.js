function getCaller(fun) {
    const caller = fun.caller;
    if (caller == null) {
        console.log("caller is global context");
    } else {
        console.log("caller.name:" + caller);
    }
    return fun.caller
}

function add() {
    getCaller(add)
}

add();

