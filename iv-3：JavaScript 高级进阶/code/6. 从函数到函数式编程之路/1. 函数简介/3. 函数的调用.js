
//直接调用
function sum1(num1, num2) {
    return num1 + num2;
}

console.log(sum1(1, 2))


//方法调用
const obj = {
    sum1: function (num1, num2) {
        return num1 + num2;
    }
}
console.log(obj.sum1(1, 3));


//构造调用
var result = new sum1(1, 3);
console.log(result);

// call 或者 apply 调用
const obj1 = {
    name: "张三",
    getName: function () {
        return this.name;
    }
}

const obj2 = {
    name: "李四"
}

console.log(obj1.getName.call(obj2));
console.log(obj1.getName.apply(obj2));

//特殊调用
(function () {
    console.log("立即执行函数");
})();

(function () {
    console.log("（）立即执行");
}());


+function () {
    console.log("测试特殊符号 + 调用")
}();

!function () {
    console.log("测试特殊符号 ! 调用")
}();


-function () {
    console.log("测试特殊符号 - 调用")
}();

~function () {
    console.log("测试特殊符号 ~ 调用")
}();