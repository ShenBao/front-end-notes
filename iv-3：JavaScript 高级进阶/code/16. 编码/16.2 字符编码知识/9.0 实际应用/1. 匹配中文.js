
var regZH = /[\u4e00-\u9fa5]/g;
console.log(regZH.test("a"));   // false
console.log(regZH.test("人"));  // true
console.log(regZH.test("𠀠"));  // false  尴尬了不