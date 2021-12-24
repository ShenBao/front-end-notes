// 迭代器模式

const array = [1, 2, 3, 4, 5];

// forEach  迭代器模式 最基础应用
// array.forEach((item,index)=>{
// console.log(`item:${item}`);
// console.log(`index:${index}`);
// })

// 倒序迭代器
let reverseEach = function (obj, callback) {
  if (!Array.isArray(obj)) {
    throw Error("params is must an array!");
  }
  for (let i = obj.length - 1; i >= 0; i--) {
    callback.call(obj[i], obj[i], i);
  }
};

reverseEach(array, (item, index) => {
  console.log(`item:${item}`);
  console.log(`index:${index}`);
});
