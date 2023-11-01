# arrayMerge
不问属性路径深浅，顺序遍历，倒叙遍历都支持，高效合并数据方案


## 示例
```js
import  * as  array from "../index";

const  { mergeArray} = array;

var arr1 = [{
    p1:1,
    key: 10
}];

var arr2 = [{
    key2: 10,
    p2:2
}]

var arr = mergeArray(arr1, arr2, {
    sourceKey: "key2",
    targetKey: "key",
});


console.log("arr", arr);
```
