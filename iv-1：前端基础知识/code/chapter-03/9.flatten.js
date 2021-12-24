const array = [1, 2, 3, 4, [5, 6, [7, 8]]];
// array  [1,2,3,4,5,6,7,8];

// reduce
function flatten(array) {
  return array.reduce(function (prev, current) {
    return prev.concat(Array.isArray(current) ? flatten(current) : current);
  }, []);
}

// const result = flatten(array);
// console.log(`result`, result);

// flat
function flatten(array) {
  return array.flat(Infinity);
}

// const result = flatten(array);
// console.log(`result`, result);

// while
function flatten(array) {
  while (array.some(Array.isArray)) {
    array = [].concat(...array);
  }
  // 1 array
  // 2 已经被拍平
  return array;
}

const result = flatten(array);
console.log(`result`, result);
