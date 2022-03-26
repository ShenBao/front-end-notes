
var nameVar = "nameVar";
nameNotVar = "nameNotVar";

console.log("nameVar", Object.getOwnPropertyDescriptor(window,"nameVar"))

console.log("nameNotVar",  Object.getOwnPropertyDescriptor(window,"nameNotVar"))