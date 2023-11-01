
//报错， for 只能遍历可迭代的对象
const obj = { fname: 'foo', lname: 'bar' };
 
for (const value of obj) { // TypeError: obj[Symbol.iterator] is not a function
    console.log(value);
}

//
const array = ['foo', 'bar', 'baz'];
 

// sex 不可枚举
Object.defineProperty(array, "0", {
    enumerable: false,
    writable:false
});

array[0]="apple";

for(let i of array){
    console.log("for of===",i);
}
console.log("=====分割=========");
for(let i in array){
    console.log("for in===",i);
}
 