
var globalObj = new Function('return this')();

console.log(globalObj === global);