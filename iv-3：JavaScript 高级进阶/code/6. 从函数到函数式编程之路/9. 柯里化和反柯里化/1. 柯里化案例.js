
function calcSum(num1, num2, num3) {
    return num1 + num2 + num3;
}

function curryCalcSum(num1) {
    return function (num2) {
        return function (num3) {
            return num1 + num2 + num3;
        }
    }
}

console.log("calcSum:", calcSum(3, 4, 5));
console.log("curryCalcSum:", curryCalcSum(3)(4)(5));