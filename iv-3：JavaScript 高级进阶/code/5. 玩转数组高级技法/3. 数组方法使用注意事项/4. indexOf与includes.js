const array1 = [NaN];
console.log("array.includes NaN:", array1.includes(NaN));
console.log("array.indexOf NaN:", array1.indexOf(NaN) > -1);

const array2 = [1, ,];
console.log("array.includes ,,:", array2.includes(undefined));
console.log("array.indexOf ,,:", array2.indexOf(undefined) > -1);

const array3 = [undefined];
console.log("array.includes undefined:", array3.includes(undefined));
console.log("array.indexOf undefined:", array3.indexOf(undefined) > -1);
