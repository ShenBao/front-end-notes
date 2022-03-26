

var ch = "𢂘";  // 𢂘
const str=escape(ch);
console.log("编码后：",str); 
console.log("解码后：",unescape(escape(ch)));


var ch1 = "`";  //ASCII值 126，127 为DEL
const str1=escape(ch1);
console.log("escape编码后：",str1); 
console.log("unescape解码后：",unescape(escape(ch1)));


const str2=encodeURI(ch1);

console.log("encodeURI编码后：",str2); 
console.log("decodeURI解码后：",decodeURI(str2));


