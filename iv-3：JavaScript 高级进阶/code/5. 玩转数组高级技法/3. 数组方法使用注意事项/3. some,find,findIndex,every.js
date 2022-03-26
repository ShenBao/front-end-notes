const array = [{ name: "张三", age: 15 }, , { name: "李四", age: 25 }, { name: "王五", age: 36 }];

//some
const isExist = array.some((item, index, arr) => {
    console.log("some index:", index);
    return item && item.age > 24;
});
console.log("array some:", isExist);

//find
const item = array.find((item, index, arr) => {
    console.log("find index:", index);
    return item && item.age > 24;
});
console.log("array find:", item);

//findIndex
const index = array.findIndex((item, index, arr) => {
    console.log("findIndex index:", index);
    return item && item.age > 24;
});
console.log("array findIndex:", index);

//every
const isAll = array.every((item, index, arr) => {
    console.log("every index:", index);
    return item && item.age > 15;
});
console.log("array every:", isAll);

const result = array.filter((item, index, arr) => {
    console.log("filter index:", index);
    return item && item && item.age > 24;
});
console.log("array filter:", result);
