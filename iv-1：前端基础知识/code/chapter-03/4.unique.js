// [1, 2, 3, 4, 5, 2, 3];
// [({ name: "freemen", age: "20" }, { name: "tt", age: "20" })];

// indexOf 查找项的下标  -1

// filter  []
// sort    []
// reduce  []  
// push    length

// const array = [1,2,3,4,5];

// const res = array.indexOf(2);

// console.log(`res`, res)
// const res = array.sort((a,b)=>{
//   return b-a
// })

// console.log(`res`, res);
// const res = array.reduce(function(prev,current,currentIndex,sourceArray){
//   return prev+current;
// })

// console.log(`res`, res)

// const res = array.push(1);

// console.log(`res`, res)
// console.log(`array`, array)

// [1,2,3,4,5,2,3]
// [{name:"freemen",age:"20"},{name:"mukwang",age:"20"}]

function handleError(array){
  if(!Array.isArray(array)){
    throw new Error("unique function params is not Array")
  }
}

// const array = [{name:"freemen",age:"20"},{name:"mukwang",age:"20"}]
// const array = [1,2,3,4,5,2,3];
// filter indexOf
// function unique(array) {
//   hanlleError(array)
//   return array.filter((item,index)=>{
//     return array.indexOf(item) === index
//   })
// }

// const res = unique(array);

// console.log(`res`, res)

// 2. 相邻元素排序
// function unique(array){
//   handleError(array);
//   array = array.sort()
//   let res = [];
//   for (let i = 0; i < array.length;i++){
//     if(array[i] !==array[i-1]){
//       res.push(array[i])
//     }
//   }
//   return res;
// }

// const res = unique(array);
// console.log(`res`, res);


// 3. Set 解构赋值

// function unique(array){
//   handleError(array);
//   return [...new Set(array)]
// }

// const res = unique(array);
// console.log(`res`, res);

//  4.  set Array.from 

// function unique(array) {
//   handleError(array);
//   return Array.from(new Set(array));
// };
// const res = unique(array);
// console.log(`res`, res)

const array = [{name:"freemen",age:"20"},{name:"mukwang",age:"20"}]

// 临时对象缓存数组项key值 

// function unique(array,key) {
//   handleError(array);
//   let result = [];
//   for (let i = 0; i < array.length; i++) {
//     var keyName = array[i][key];
//     if(template[keyName]){
//       continue;
//     }
//     template[keyName] = true;
//     result.push(array[i]);
//   }
//   return result;
// }

// const res = unique(array,'age');

// console.log(`res`, res);


// function unique(array,key) {
//   handleError(array);
//   var cacheObject = {}
//   return array.reduce((prve,current)=>{
//      cacheObject[current[key]]?"":cacheObject[current[key]]=true&&prve.push(current)
//      return prve;
//   },[])
// }

// const res = unique(array,'age');
// console.log(res);