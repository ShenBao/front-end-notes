// 字面量
const arr = [1, 2, 3, ...[4, 5, 6]]; // 1,2,3,4,5,6
const arr1 = [, , , , ,]; // [empty × 5]
console.log("arr==", arr);
console.log("arr1==", arr1);

// new Array
const arr2 = new Array(1, 2, 3); // 1,2,3
const arr3 = new Array("a"); //["a"]
const arr4 = new Array(5) // [empty × 5]
console.log("arr2 new Array==", arr2);
console.log("arr3 new Array==", arr2);
console.log("arr4 new Array==", arr3);

// Array.of
const arr5 = Array.of(5)  // [5]
console.log("arr5 Array.of ==", arr5);

// Array.from
const arr6 = Array.from([1, 2, 3]); // [1,2,3]
const arr7 = Array.from({ length: 3 }, function (value, index) {
    return index + 1
}); // [1,2,3]
const arr8 = Array.from({ 0: "a", 1: "b", 2: "c", length: 3 });  // ["a", "b", "c"]
console.log("arr6 Array.from ==", arr6);
console.log("arr7 Array.from ==", arr7);
console.log("arr8 Array.from ==", arr8);


// Array.prototype.slice
const arr9 = Array.prototype.slice.call(document.querySelectorAll("div")) // [div, div, div....]
console.log("arr9 Array.prototype.slice ==", arr9);
// Array.prototype.concat
const arr10 = Array.prototype.concat.call([], [1, 2, 3]) // [1,2,3]
console.log("arr9 Array.prototype.concat ==", arr10);