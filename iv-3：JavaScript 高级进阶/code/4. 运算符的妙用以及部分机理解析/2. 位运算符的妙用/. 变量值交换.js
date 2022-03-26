let a = 10;
let b = 20;

a ^= b;
b ^= a;
a ^= b;

console.log("a==", a)
console.log("b==", b)



