


let str = "A";
let str2 = "𢂘";
console.log(str.charCodeAt(0)); //65    码点
console.log(str.codePointAt(0)); //65     码点
console.log(str2.charCodeAt(0)); //55368    返回第一个码元的码点
console.log(str2.codePointAt(0)); //139416   返回两个码元合为一体的一个码点

console.log(str2.charCodeAt(0).toString(16)); //d8d8  返回前两个字节，也就是前一个码元的16进制
console.log(str2.charCodeAt(1).toString(16)); //dc98  返回后两个字节，也就是后一个码元的16进制
