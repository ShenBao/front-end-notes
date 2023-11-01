// 借用其他数组的Symbol.iterator
var arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
  [Symbol.iterator]: [][Symbol.iterator],
};
console.log([...arrayLikeObj]); // [1,2]

// 自己实现一个 Symbol.iterator

var arrayLikeObj = {
  length: 2,
  0: 1,
  1: 2,
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.length) {
          return {
            value: self[index++],
            done: false,
          };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

console.log([...arrayLikeObj]); // [1, 2]
