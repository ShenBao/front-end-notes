//不可配置的
var obj = {};
Object.defineProperty(obj, 'name', { configurable: false });
console.log("delete obj.name", delete obj.name);

// undefined
console.log("delete undefined:", delete undefined);
console.log(Object.getOwnPropertyDescriptor(global, "undefined"));

// Infinity
console.log("delete Infinity:", delete Infinity);
console.log(Object.getOwnPropertyDescriptor(global, "Infinity"));

// NaN
console.log("delete NaN:", delete NaN);
console.log(Object.getOwnPropertyDescriptor(global, "NaN"));

// window
// console.log("delete window:", delete window);
// console.log(Object.getOwnPropertyDescriptor(window));

// document
// console.log("delete window.document", delete window.document);
// Object.getOwnPropertyDescriptor(window, "document");