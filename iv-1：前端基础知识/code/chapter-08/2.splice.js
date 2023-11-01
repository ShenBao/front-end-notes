// js 如何删除数组中指定的元素
const array = [{ name: "freemen", age: 18 }, { name: 'vinko', age: 20 }];

function cutArray(sourceArray, target) {
   sourceArray.forEach((item, index) => {
      if (item.name === target) {
         sourceArray.splice(index, 1);
      }
   })
   return sourceArray;
}

const result = cutArray(array, 'freemen');
console.log(result);
