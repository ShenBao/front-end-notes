const array = [1, 2, 3, 4, 5, 6];
array[10] = 10;
console.log("array.length:", array.length);

array["test"] = 11;
console.log("array.length:", array.length);


array.length = 3;
console.log("array.length:",  array.length);


console.log("array.length:", array.length);
console.log("array value:", array[Number.MAX_VALUE + 1000])