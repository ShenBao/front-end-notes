const array = [1,2,3,4,5,9,8,7,6];

// 选择排序 原址比较排序算法。
// 选择排序大致的思路是找到数据结构中的最小值并
// 将其放置在第一位，接着找到第二小的值并将其放在第二位，
// 以此类推。

const selectionSort  = (array)=>{
    let length = array.length;
    let minIndex;
    for (let i = 0; i < length; i++) {
       // 更新 minIndex
       minIndex = i;
       for (let j = i; j < length; j++) {
           if(array[minIndex]>array[j]){
              minIndex = j;
           }
       }
       // 如果该最小值和原最小值不同 则交换其值
       if(i!==minIndex){
           var aux = array[i];
           array[i] = array[minIndex];
           array[minIndex] = aux;
       }
    }
    return array;
}

const result = selectionSort(array);

console.log(result);

// 找到数据结构中的最小值并 将其放置在第一位，接着找到第二小的值并将其放在第二位