const arrayLike = {
    0: "a",
    1: "b",
    4: "124",
    "name": "test",
    length: 3,
    push: Array.prototype.push, //自己实现
    splice: Array.prototype.splice
}

console.log(arrayLike[0])  //"a"

//由于类数组对象length属性声明了对象有多少个属性,所以可以使用for遍历对象属性:
for (let i = 0; i < arrayLike.length; i++) {
    console.log(arrayLike[i])
}


//非类数组
const obj = {
    0: "a",
    1: "b",
    2: "c"
}