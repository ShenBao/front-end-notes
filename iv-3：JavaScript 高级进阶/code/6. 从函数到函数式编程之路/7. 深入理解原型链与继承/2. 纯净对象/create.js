var obj = Object.create(null);
console.log(obj.__proto__); // undefined
console.log(obj.toString); // undefined

for(var p in obj) {
    console.log(p)
}