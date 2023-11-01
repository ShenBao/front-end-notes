const arr1 = [0, 1, 2];
const arr2 = [3, 2, 0];

function intersectSet(arr1, arr2) {
  return [...new Set(arr1)].filter((item) => arr2.includes(item));
}

const values = intersectSet(arr1, arr2);

console.log(values);
