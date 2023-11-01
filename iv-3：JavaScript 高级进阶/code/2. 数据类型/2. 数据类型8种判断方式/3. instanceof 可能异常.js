// 安全性不如typeof
aaaa instanceof Object 
// Uncaught SyntaxError: Unexpected identifier
typeof aaaa // 'undefined'


// 右边必须是函数或者class
// var aaaa = "";
// aaaa instanceof {} 