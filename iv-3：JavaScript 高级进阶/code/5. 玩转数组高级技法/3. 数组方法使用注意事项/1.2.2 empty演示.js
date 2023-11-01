
const arr = [1, , 3,];

// 基于键遍历
arr.forEach(function (v, index) {
    console.log("forEach:", v)
})

// 基于值运算
const index = arr.findIndex(v=> v === undefined)
console.log("findIndex:", index)

console.log("join:", arr.toString());