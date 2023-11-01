const array = [1, 2, 3, 4, 5];
//concat
const concatArray = array.concat(6, [7, 8]);
console.log("array.concat:", concatArray);

//concat 是基于原数组浅复制,这块我们克隆的时候讲过
const array1 = [{ name: "张三" }];
const array2 = array1.concat({ name: "李四" });
array2[0].name = "王五";
console.log("array.concat 修改item:", array1, "==array2==", array2);

//slice  注意，这里也是浅复制
const array3 = [{ name: "张三" }, { name: "李四" }, { name: "王五" }];
const sliceArray = array3.slice(2, 3);
console.log("array.slice:", sliceArray, "==array3=", array3);
sliceArray[0].name = "赵六";
console.log("array.slice 修改item:", sliceArray, "==array3=", array3);
