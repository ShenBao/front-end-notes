const { hasOwnProperty } = Object.prototype;

function isObject(obj) {
    return obj !== null && typeof obj == "object";
}

function isArray(obj) {
    return Array.isArray(obj)
}

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

function deepClone(obj) {
    if (!isObject(obj)) return obj;
    const data = isArray(obj) ? [] : {};
    for (let key in obj) {
        const val = obj[key];
        if (hasOwn(obj, key)) {
            data[key] = deepClone(val);
        }
    }
    return data;
}

const arr = [1, 2];
arr.ccc = "ccc"

var obj1 = {
    name: "obj1",
    age: 18,
    date: new Date(),
    arr
};
const a = deepClone(obj1)
console.log(a);


// // 循环引用
// var obj2 = {
//     name: "obj2"
// };
// obj2[obj2] = obj2;
// deepClone(obj2)
