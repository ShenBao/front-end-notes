function sum1(num1, num2) {
    console.log("arguments", arguments);
    console.log("argument==", arguments.callee)
    return num1 + num2;
}


console.log(sum1(1, 2, 3));

console.log(sum1(1));

console.log(sum1("a"));