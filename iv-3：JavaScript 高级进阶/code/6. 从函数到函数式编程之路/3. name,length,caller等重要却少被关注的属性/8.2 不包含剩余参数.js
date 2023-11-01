function sum(num1, num2, ...args) {
    console.log("...args:", ...args);
    return num1 + num2;
}

console.log("length:", sum.length);
