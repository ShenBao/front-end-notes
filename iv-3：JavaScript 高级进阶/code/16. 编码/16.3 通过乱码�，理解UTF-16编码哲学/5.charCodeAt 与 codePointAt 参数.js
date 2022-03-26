

let str = "A";
let str2 = "𢂘A";
console.log(str.charCodeAt(0)); //65

console.log(str2.charCodeAt(0)); //55368
console.log(str2.charCodeAt(1)); //56472
console.log(str2.charCodeAt(2)); //65

console.log(str2.codePointAt(0)); //139416
console.log(str2.codePointAt(1)); //56472
console.log(str2.codePointAt(2)); //65
