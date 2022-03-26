const test1 = ";,/?:@&=+$";  // 保留字符
const test2 = "-_.!~*'()";   // 不转义字符
const test3 = "#";           // 数字标志
const test4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(test1)); 
console.log(encodeURI(test2)); 
console.log(encodeURI(test3)); 
console.log(encodeURI(test4)); 

console.log("-----------encodeURIComponent------------"); 

console.log(encodeURIComponent(test1)); 
console.log(encodeURIComponent(test2)); 
console.log(encodeURIComponent(test3)); 
console.log(encodeURIComponent(test4)); 


