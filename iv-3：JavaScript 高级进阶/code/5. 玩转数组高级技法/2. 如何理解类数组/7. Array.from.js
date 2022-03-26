// 类数组
const arrayLikeObj = {
    length: 2,
    0: 1,
    1: 2
};
console.log(Array.from(arrayLikeObj))  // [1,2]

const str="abc";
console.log(Array.from(str));