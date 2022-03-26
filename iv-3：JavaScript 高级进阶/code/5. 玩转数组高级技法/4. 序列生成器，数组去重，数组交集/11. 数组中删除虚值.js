const array = [false, 0, undefined, , "", NaN, 9, true, undefined, null, "test"];
const newArray = array.filter(Boolean);
console.log(newArray); 