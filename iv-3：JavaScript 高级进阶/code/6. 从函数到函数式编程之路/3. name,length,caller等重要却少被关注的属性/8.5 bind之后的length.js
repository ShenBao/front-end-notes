function sum(num1, num2, num3) {
    return num1 + num2 + num3;
}

console.log("sum.length", sum.length);

const boundSum0 = sum.bind(null);
console.log("boundSum0.length:", boundSum0.length);

const boundSum1 = sum.bind(null, 1);
console.log("boundSum1.length:", boundSum1.length);

const boundSum2 = sum.bind(null, 1, 2);
console.log("boundSum2.length:", boundSum2.length);

const boundSum3 = sum.bind(null, 1, 2, 3);
console.log("boundSum3.length:", boundSum3.length);

const boundSum4 = sum.bind(null, 1, 2, 3, 4);
console.log("boundSum4.length:", boundSum4.length);
