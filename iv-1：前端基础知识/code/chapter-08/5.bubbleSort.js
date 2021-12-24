// 冒泡排序   比较任何两个相邻的项, 如果第一个比第二个大,
// 则交换它们。元素项向上移动至 正确的顺序,
// 就好像气泡升至表面一样，冒泡排序因此得名
// [1,2,3,4,5,9,8,7,6]

const array = [1, 2, 3, 4, 5, 9, 8, 7, 6];

const bubbleSort = (array) => {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (array[j] > array[j + 1]) {
        var aux = array[j];
        array[j] = array[j + 1];
        array[j + 1] = aux;
      }
    }
  }
  return array;
};

const result = bubbleSort(array);

console.log(result);

// 1 两层for循环 2 交换数组元素位置
