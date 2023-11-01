// 类数组
const arrayLikeObj = {
    length: 2,
    0: 1,
    1: 2
};
const array1 = Array.prototype.slice.call(arrayLikeObj) 
console.log(array1);

const array2 = Array.prototype.concat.apply([], arrayLikeObj) 
console.log(array2);