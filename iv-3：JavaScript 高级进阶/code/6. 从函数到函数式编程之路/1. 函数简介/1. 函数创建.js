// new Function
var sum0 = new Function('num1', 'num2', 'return num1 + num2');

// 函数申明
function sum1(num1, num2) {
    return num1 + num2;
}

// 函数表达式
var sum3 = function sum2(num1 , num2) {
    return num1 + num2
}

// 箭头函数
var sum4 = (num1,num2)=> num1 + num2;

// eval
var sum5 =  eval(`(function sum(num1, num2){return num1 + num2})`);

console.log(sum0(1, 2));
console.log(sum1(1, 2));
console.log(sum3(1, 2));
console.log(sum4(1, 2));
console.log(sum5(1, 2));