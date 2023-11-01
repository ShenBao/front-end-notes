//使用 isFinite() 在检测无穷数：
function isArrayLikeObject(arr) {
    const typeStr = typeof arr;
    // if (typeStr === 'string') {
    //     return true
    // }
    if (arr == null || typeStr !== 'object')
        return false;

    const lengthMaxValue = Math.pow(2, 53) - 1;;
    if (!Object.prototype.hasOwnProperty.call(arr, "length"))
        return false;
    if (typeof arr.length != "number") return false;
    if (!isFinite(arr.length)) return false;
    if (Array === arr.constructor) return false;

    if (arr.length >= 0 && arr.length < lengthMaxValue) {
        return true
    } else {
        return false
    }
}


console.log("arr==", isArrayLikeObject(null));

const arr = { 0: 1, 2: 3, length: 2 };
console.log("arr==", isArrayLikeObject(arr));

const arr1 = { 0: 1, 2: 3, length: "" };
console.log("arr==", isArrayLikeObject(arr1));

const arr2 = { 0: 1, 2: 3 };
console.log("arr==", isArrayLikeObject(arr2));

const arr3 = [1, 2];
console.log("arr==", isArrayLikeObject(arr3));
