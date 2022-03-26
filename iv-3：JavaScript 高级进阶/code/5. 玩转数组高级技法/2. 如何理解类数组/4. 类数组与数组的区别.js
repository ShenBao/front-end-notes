function person(name, age, sex) {
    console.log("类数组 type::", Object.prototype.toString.call(arguments));
    console.log("类数组 instanceof object::", arguments instanceof Object);
    console.log("类数组 constructor::", arguments.constructor);
    console.log("类数组 isArray::", Array.isArray(arguments));
}

person('name', 'age', 'sex');


const array=['name','age','sex'];

console.log("数组 type::", Object.prototype.toString.call(array));
console.log("数组 instanceof array::", array instanceof Array);
console.log("数组 constructor::", array.constructor);
console.log("数组 isArray::", Array.isArray(array));

