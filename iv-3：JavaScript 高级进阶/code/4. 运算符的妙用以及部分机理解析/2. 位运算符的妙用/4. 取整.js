
console.log(~~54.25)
console.log(54.25 >> 0)
console.log(54.25 >>> 0)
console.log(54.25 | 0)

//原理 ~ ， 实质上是对数字求负，然后减 1 (-x-1).
//那么~~就是对数字求负减一后再求负减1 (-（-x-1）)-1 也就可以用于取整
var result = function (num) {
    console.log(-num - 1);
    const result1 = (-num - 1);
    console.log(-result1);
    return -result1 - 1
};

console.log("abc==", ~54)
console.log("abc==", result(54))

