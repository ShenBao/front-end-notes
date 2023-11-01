const array = [1, 2, 3, 4, 5];

// Math.max
const res = Math.max(...array);
// const res = Math.max.apply(null,array)
console.log(`res`, res);

// reduce 函数
function getMax(array) {
  return array.reduce((prev, current) => {
    return current > prev ? current : prev;
  });
}

// const res = getMax(array);
// console.log(`res`, res);

// sort
function getMax(array) {
  const result = array.sort();
  return result[result.length - 1];
}

const res = getMax(array);
console.log(`res`, res);
