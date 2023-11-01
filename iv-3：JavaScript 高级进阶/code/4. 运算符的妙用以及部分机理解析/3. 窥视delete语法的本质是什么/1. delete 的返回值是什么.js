var a = {
    p1: 1,
    p3: 5
}

// 对象的属性
console.log("delete a.p1:", delete a.p1);
// 对象上不存在的属性
console.log("delete a.p2:", delete a.p2);
// 全局对象a 
console.log("delete var a:", delete a);

console.log("");
console.log("var a:", a);
