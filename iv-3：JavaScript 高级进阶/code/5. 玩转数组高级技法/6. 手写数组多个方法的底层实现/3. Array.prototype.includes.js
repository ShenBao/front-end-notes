const arr = [1, 2, 3, { a: 1 }, null, undefined, NaN, ""]

console.log("includes null:", arr.includes(null));
console.log("indexOf null:", arr.indexOf(null));

console.log("includes NaN:", arr.includes(NaN));
console.log("indexOf NaN:", arr.indexOf(NaN));