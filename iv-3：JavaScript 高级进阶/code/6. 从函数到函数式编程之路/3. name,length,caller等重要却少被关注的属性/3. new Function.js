const addFn = new Function("num1", "num2", "return num1 + num2");

console.log(addFn(1, 2));

console.log("name:", addFn.name);
