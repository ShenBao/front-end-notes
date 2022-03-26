var a = 1;

function sum(num1, num2) {
    return num1 + num2 + a;
}

console.log("a=1:", sum(1, 2));
a = 3;
console.log("a=2:", sum(1, 2));
