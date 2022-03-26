function double(val) {
    return val * 2;
}

function add(val, num) {
    return val + num;
}

function minus(val, num) {
    return val - num;
}

function multi(val, num) {
    return val * num;
}

function divide(val, num) {
    return val / num;
}

function pow(val, num) {
    return Math.pow(val, num);
}

function pipe(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduceRight((a, b) => (...args) => a(b(...args)))
}

const cal = pipe(
    val => add(val, 10),
    val => minus(val, 5),
    double,
    val => multi(val, 10),
    val => divide(val, 2),
    val => pow(val, 2));

console.log(cal(10))