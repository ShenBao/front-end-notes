
// 计时器, 浏览器中执行
// setTimeout('console.log("setTimeout:", Date.now())', 1000)
// setInterval('console.log("setInterval", Date.now())', 5000)

console.log();
// JSON字符串转对象
var jsonStr = `{a:1, b:1}`;
var obj = eval('(' + jsonStr + ')' );
console.log("eval json:", obj, typeof obj);

// 生成函数
var sumAdd = eval(`(function add(num1, num2){
    return num1 + num2
}
)`)
console.log('sumAdd:', sumAdd(10,20))

// 数字数组相加
var arr = [1,2,3,7,9];
var r = eval(arr.join('+'))
console.log("数组相加:", r);

// 获取全局对象
var globalThis = (function(){ return (void 0,eval)("this")})();

console.log("globalThis:", globalThis)
