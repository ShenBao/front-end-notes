
function calcSum(num1, num2, num3) {
    return num1 + num2 + num3;
}

function curryCalcSum(num1) {
    return function (num2, num3) {
        return num1 + num2 + num3;
    }
}

const pCalcSum = curryCalcSum(10);

console.log(pCalcSum(11, 12));

console.log(pCalcSum(15, 20));

console.log(pCalcSum(22, 30));