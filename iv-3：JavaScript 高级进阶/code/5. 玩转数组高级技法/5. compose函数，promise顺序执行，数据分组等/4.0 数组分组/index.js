const hasOwn = Object.prototype.hasOwnProperty;
function group(arr, fn) {
    // 不是数组
    if (!Array.isArray(arr)) {
        return arr;
    }
    // 不是函数
    if (typeof fn !== "function") {
        throw new TypeError("fn必须是一个函数")
    }
    var v;
    return arr.reduce((obj, cur, index) => {
        v = fn(cur, index);
        if (!hasOwn.call(obj, v)) {
            obj[v] = []
        }
        obj[v].push(cur);
        return obj;
    }, {});
}

// 按照长度分组
let result = group(["apple", "pear", "orange", "peach"],
    v => v.length);
console.log(result);


// 按照份数分组
result = group([{
    name: "tom",
    score: 60
}, {
    name: "Jim",
    score: 40
}, {
    name: "Nick",
    score: 88
}], v => v.score >= 60)

console.log(result);