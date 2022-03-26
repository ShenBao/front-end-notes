function sum(num1, num2) {
    console.log("arguments.length:", arguments.length);
    return num1 + num2;
}

console.log("length:", sum.length);

sum(1, 2, 3, 4);