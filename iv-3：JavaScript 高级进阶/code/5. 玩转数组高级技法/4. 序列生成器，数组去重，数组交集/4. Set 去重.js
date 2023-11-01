const arr = ["apple", "banana", 1,1,3, 3, undefined,undefined,,,NaN,NaN, null,null,"true",true,{a: 1}];

const arr1 = Array.from(new Set(arr)); 
console.log("set:",arr1);