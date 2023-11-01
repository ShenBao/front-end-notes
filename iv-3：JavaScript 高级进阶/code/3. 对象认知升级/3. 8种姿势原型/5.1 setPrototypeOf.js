var obj = {a:1};
console.log(obj.toString());
Object.setPrototypeOf(obj, null)

// obj.toString is not a function
console.log(obj.toString());
