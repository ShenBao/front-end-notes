
const arr = [1, ,];
console.log("arr:", arr);

// 长度
console.log("arr.length:", arr.length);
// 键
console.log("keys", Object.keys(arr));
// empty 空位的值为undefined
console.log("0:", arr[0], ",1:", arr[1]);

// 怎么判断空位
console.log("hasOwn:0", Object.prototype.hasOwnProperty.call(arr, "1"))
console.log("hasOwn:1", Object.prototype.hasOwnProperty.call(arr, "1"))

