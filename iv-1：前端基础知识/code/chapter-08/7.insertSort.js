// 对给定数组实现插入排序 
const array = [9,3,4,5,6];

insertionSort = function(){ 
    // 声明代码中使用的变量
    let length = array.length; 
    let j;
    let temp;
    // 迭代数组来给第i项找到正确的位置 
    for (var i=1; i<length; i++){ // {2} 
        j = i; 
        temp = array[i]; //{4} 
        while (j>0 && array[j-1] > temp){ //{5} 
           array[j] = array[j-1]; //{6} 
           j--; 
        } 
        array[j] = temp; //{7} 
    } 
    return array;
};

const result  = insertionSort(array);

console.log(result);