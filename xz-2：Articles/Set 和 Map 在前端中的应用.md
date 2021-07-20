# Set 和 Map 在前端中的应用

在前端日新月异的大背景下， ES6 也基本已经覆盖性地全民普及。而数据结构集合和字典，也被运用于 ES6 的语法当中。 ES6 通过使用 Set 和 Map 这两个函数，来实现集合和字典的思想。而集合和字典，又是怎么被灵活应用的呢？

## 集合

### 集合是什么？

- 集合是一种无序且唯一的数据结构；
- ES6 中有集合，名为 Set ；
- 集合的常用操作： 去重、判断某元素是否在集合中、求交集……

### 前端与集合：使用ES6中的Set

ES6 中的 Set 可以做什么呢？

- 使用 Set 对象： new 、 add 、 delete 、 has 、 size
- 迭代 Set ：多种迭代方法、 Set 与 Array 互转、求并集/交集/差集

### 用Set模拟并集、交集和差集

#### 模拟并集运算

可以创建一个函数，来返回包含 setA 和 setB 中所有元素的新集合。迭代这两个集合，并把所有元素都添加到并集的集合中。

```js
//模拟并集运算
const union = （setA， setB) => {
    const unionab = new Set()
    setA.forEach(value => unionab.add(value))
    setB.forEach(value => unionab.add(value))
    return [...unionab]
}

console.log(union([1, 2, 5, 8, 9], [4, 5, 8, 9, 10])) //[1, 2, 5, 8,9, 4, 10]
```

#### 模拟交集运算

模拟交集运算需要创建一个辅助函数，来生成包含 setA 和 setB 两个集合中共同拥有元素的新集合。

```js
// 模拟交集运算
const intersection = (setA, setB) => {
    const intersectionSet = new Set()
    const arrSetB = new Set(setB)
    setA.forEach(value => {
        if (arrSetB.has(value)) {
            intersectionSet.add(value)
        }
    })
    return [...intersectionSet]
}

console.log(intersection([1, 2, 5, 8, 9], [4, 5, 8, 9, 10])) //[5,8,9]
```

#### 模拟差集运算

差集运算是创建集合 setA 有，而集合 setB 没有的元素。简单来说，就是 setA 减去和 setB 相交的部分，剩余的部分即是差集的部分。

```js
// 模拟差集运算
const difference = (setA, setB) => {
    const differenceSet = new Set()
    const arrSetB = new Set(setB)
    setA.forEach(value => {
        if (!arrSetB.has(value)) {
            differenceSet.add(value)
        }
    })
    return [...differenceSet]
}

console.log(difference([1, 2, 5, 8, 9], [4, 5, 8, 9, 10])) //[1, 2]
```

### 使用扩展运算符来模拟并集、交集和差集

上面实现了用Set来模拟并集、交集和差集，但这似乎有一点点冗余，如果遇到数据量大的时候还每一次都要执行这么多行代码，似乎这样子听起来就那么友好了。

因此，我们引入了一种新的方法来解决，ES6的扩展运算符。

如果使用扩展运算符来进行运算的话，整个过程只需要三个步骤：

- 将集合转化为数组；
- 执行需要的运算；
- 将结果转化回集合。

接下来我们就用扩展运算符，来一一实现并集、交集和差集。

#### （1）用扩展运算符实现并集

来看下面一段代码：

```js
// 模拟并集运算
const union = (setA, setB) => {
    return new Set([...setA, ...setB]);
}
console.log(union([1, 2, 5, 8, 9], [4, 5, 8, 9, 10])) //[1, 2, 5, 8,9, 4, 10]
```

通过以上代码我们可以看到，使用扩展运算符，只需要短短一行代码，即可实现具体的并集运算，这样看起来简洁了许多。
接下来我们继续用这种方法，来实现交集和差集。

#### （2）用扩展运算符实现交集

```js
// 模拟交集运算
const intersection = (setA, setB) => {
    const arrB = new Set(setB);
    return [...setA].filter(x => arrB.has(x));
}
console.log(intersection([1, 2, 5, 8, 9], [4, 5, 8, 9, 10])) //[5, 8, 9]
```

与并集一样的效果，运用扩展运算符，很简洁的就实现了交集的功能。

#### （3）用扩展运算符实现差集

```js
// 模拟差集运算
const difference = (setA, setB) => {
    const arrB = new Set(setB)
   return [...setA].filter(x => !arrB.has(x));
}
console.log(difference([1, 2, 5, 8, 9], [4, 5, 8, 9, 10])) //[1, 2]
```

同样地，使用扩展运算符的方法，但与交集相反的是，交集是筛选出集合setB拥有的元素，而差集是筛选出集合setB没有的元素，从而最终达到具体效果。

### leetcode349两个数组的交集

- https://leetcode-cn.com/problems/intersection-of-two-arrays/

```js
/**
 * @param {Array} nums1 数组1
 * @param {Array} nums2 数组2
 * @returns 
 */
let intersection = function(nums1, nums2){

    // 先进行数组去重
    const arr1 = new Set(nums1);
    const arr2 = new Set(nums2);
    
    // 过滤掉arr1在arr2中已经有的元素，过滤结果即为交集
    // has可改为includes
    const arr3 = [...arr1].filter(item => arr2.has(item));

    return arr3;
}
console.log(intersection([1,2,3,4],[4,6,8]))
```

## 字典

### 字典是什么？

- 字典与集合相似，字典也是一种存储唯一值的数据结构，但它是以键值对的形式来存储。
- 注意：字典一定是以键值对的形式存储！！

### 前端与集合：使用ES6中的Map

ES6中的Map可以做什么呢？

- 使用 Map 对象： new 、 set 、 delete 、 clear ；
- 字典的常用操作，键值对的增删改查。

### 使用Map类的API

```js
const map = new Map()

//增
map.set('monday', '星期一')
map.set('Tuesday', '星期二')
map.set('Wednesday', '星期三')

console.log(map.has('monday')) //true
console.log(map.size) //3
console.log(map.keys()) //输出{'monday', 'Tuesday', 'Wednesday'}
console.log(map.values()) //输出{'星期一', '星期二', '星期三'}
console.log(map.get('monday')) //星期一

//删
map.delete('monday')

//清空
map.clear()

//改
map.set('monday', '星期四')
```

### leetcode349两个数组的交集

- https://leetcode-cn.com/problems/intersection-of-two-arrays/

```js
/**
 * @param {Array} nums1 数组1
 * @param {Array} nums2 数组2
 * @returns 
 */
let intersection = function(nums1, nums2){
    // 先建立一个字典
    const map = new Map();
    // 遍历nums1的每一个，并放入数组中
    nums1.forEach(n => {
        map.set(n, true);
    });

    const res = [];
    // 遍历nums2中的每一个
    nums2.forEach(n => {
        // 与nums1中的对比，如果一样则push进res
        if(map.get(n)){
            res.push(n);
            map.delete(n);
        }
    });
    return res;
}

console.log(intersection([1, 2, 2, 1], [2, 2]))
```

### leetcode20有效地括号

- https://leetcode-cn.com/problems/valid-parentheses/

```js
/**
 * 
 * @param {String} s 括号字符串
 * @returns boolean
 */
 let isValid = function(s){
    if(s.length % 2 === 1){
        return false;
    }

    const stack = [];
    const map = new Map();
    map.set('(', ')');
    map.set('{', '}');
    map.set('[', ']');

    for(let i = 0; i < s.length; i++){
        const c = s[i];
        if(map.has(c)){
            stack.push(c);
        }else{
            // 获取栈中最后一个括号的值
            const t = stack[stack.length - 1];
            if(map.get(t) === c){
                stack.pop();
            }else{
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(isValid('[]')) //true
console.log(isValid('(]')) //false
console.log(isValid('([)]')) //false

```

### leetcode1两数之和

- https://leetcode-cn.com/problems/two-sum/

```js
/**
 * 
 * @param {Array} nums 数组
 * @param {Number} target 目标和 
 * @returns []
 */
let twoSum = function(nums, target){
    const map = new Map();
    for(i = 0; i < nums.length; i++){
        // 来找对象的人的值
        const n = nums[i];
        // 想找的目标对象的值
        const n2 = target - n;
        // 找到对象时
        if(map.has(n2)){
            return [map.get(n2), i];
        }
        // 找不到对象时，放进字典里等待对象的到来
        else{
            map.set(n, i);
        }
    }
    return '没有目标匹配';
}

console.log(twoSum([1, 2, 3, 4], 6)) //[1, 3]
```

### leetcode3无重复字符的最长子串

- https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

```js
/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function(s){
    let l = 0;
    let res = 0;
    const map = new Map();
    for(let r = 0; r < s.length; r++){
        // map.get(r) >= l 确保下标在左指针右边
        if(map.has(s[r]) && map.get(s[r]) >= l){
            l = map.get(s[r]) + 1;
        }
        res = Math.max(res, r - l + 1);
        map.set(s[r], r);
    }
    return res;
}

console.log(lengthOfLongestSubstring('ssdfsf')) // 3
```

### leetcode76最小覆盖子串

- https://leetcode-cn.com/problems/minimum-window-substring/

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
let minWindow = function(s, t){
    // 用双指针维护一个滑动窗口
    // 指针初始位置都在第一个位置，即下标索引为0
    let l = 0;
    let r = 0;
    // 建立一个字典，用来表示子串需要的字符以及它的个数
    const need = new Map();
    for(let c of t){
        // 遍历子串的字符，存放到字典里
        need.set(c, need.has(c) ? need.get(c) + 1 : 1);
    }

    // 需要的类型数量
    let needType = need.size;
    let res = '';
    // 移动右指针
    while(r < s.length){
        // 在右指针不断移动的过程中，我们不断获取当前的字符
        const c = s[r];
        // 判断当前字符是否在我们的需求列表里面
        if(need.has(c)){
            need.set(c, need.get(c) - 1);
            if (need.get(c) === 0){
                needType -= 1;
            }
        }
        while(needType === 0){
            // 打印滑动窗口及表示的子串
            // substring方法遵循左闭右开原则
            // console.log(s.substring(l, r + 1));
            const newRes = s.substring(l, r + 1);
            // 找出最小的子串
            if(!res || newRes.length < res.length){
                res = newRes;
            }
            // c2代表左指针当前的字符
            const c2 = s[l];
            // 如果左指针在需求列表里面
            if(need.has(c2)){
                // 字符的需求数量就需要增加
                need.set(c2, need.get(c2) + 1);
                // 如果字符需求数量为1，原来是0，现在是1，那么就重新需要此字符
                if (need.get(c2) === 1){
                    needType += 1;
                }
            }
            l += 1;
        }//当跳出while循环时，意味着左指针不能再移动，要开始移动右指针
        // 右指针移动则递增1
        r += 1;
    }
    return res;
}

console.log(minWindow('ASDFFGFGCX','AFG')) // ASDFFG
```

