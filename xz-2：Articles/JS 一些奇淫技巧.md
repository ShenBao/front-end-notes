# JS 一些奇淫技巧


## 向下取整最快方式

向下取整有很多方法, Math.floor, parseInt都可以, 不过两个非(~)运算符来取整是最方便的, 而且逻辑运算很快.
还可以用~~再加1来向上取整.

```ts
~~3.14
 
> 3
 
~~Math.PI
 
> 3
 
~~Math.E
 
> 2
 
~~12.98
 
> 12
```

## 转数值类型最快方式

字符串转数字类型也有很多方式, parseFloat, Number(), 但官方推荐直接用一个加号(+)运算符, 是最快最简洁的.

```ts
+ new Date()
 
> 1559785422952
 
+'123'
 
> 123
 
+ {}
 
> NaN
```

## 四舍五入

这个不算奇淫技巧了, 因为本身就与Math.round和toFixed(), 以及toPrecision来实现.

```ts
+Math.E.toFixed(0)
 
> 3
 
+Math.E.toFixed(1)
 
> 2.7
 
+Math.E.toFixed(2)
 
> 2.72
```

##  ===比==快

==和!=操作符会在需要的情况下自动转换数据类型。但===和!==不会，它们会同时比较值和数据类型, 避免了多余的计算，这也使得它们要比==和!=快。
现在人很少利用==来做类型转换了, JS也有往强类型发展的趋势.


## 最安全的交换变量

如何不借助第三个变量(容器)交换2个变量a和b的内容呢? 最安全且最快的办法是利用异或门(^)来进行:

```ts
let a = 12;
 
let b = 123;
 
a = a ^ b;
 
b = a ^ b;
 
a = a ^ b;
 
a;
> 123

b;
> 12
```

可能有老师教用加法(+)来取代异或, 加法不仅慢而且容易产生溢出, 不安全, 所以不提倡加法交换. 异或或者同或才能实现在2个容器的情况下保证数据不丢失.


如果借助第三方存储空间老交换变量, 虽然性能不是最优, 看上去会比较直观一些, 最直观的写法是通过数组解构:

```ts
[a, b] = [b, a];
```

## 获取指定范围内均匀分布的随机数

```ts
let x = Math.random() * (max - min) + min;
```

## 最快生成[1,2,3, .... ,n] 的列表

利用列表的下标index来生成数是非常快的.

```ts
Array(10).fill(true).map((x,i)=>i+1);
 
> (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

还可以看出, 快速构建一个长度为n的列表可以使用Array(n).fill(1);

同理, 构造奇数偶数序列也可以通过这种方式, 还有很多基于自然数的有规律序列都可以这样生成.

## 打乱列表

利用sort方法快速排序的时候引入一个随机量..嘿嘿

```ts
const list = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
 
list.sort(()=>Math.random()-0.5)
 
> (8) [120, 122205, 458, 400, 5, -215, -85411, 228]
```

## 列表聚合

Array.prototype.reduce是一个对列表进行摘要的算法(输入多个元素, 输出一个值), 比如数值列表求和:

```ts
list.reduce((sum, curr)=>sum+curr,0)
```

## 列表遍历取代循环语句

函数式编程中可以利用Array的forEach, map, filter, some, every, find来取代传统的for循环, while循环, 不仅更优雅, 而且提升了一定效率。


## 最快构造一个循环链表

每次执行一下list.push(list.shift());然后访问list[0], 无需额外代码, 最直接实现循环链表, 帅!

```ts
const list = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
 
list.push(list.shift());
 
list[0];
 
> 458
 
list.push(list.shift());
 
list[0];
 
> 120
 
list.push(list.shift());
 
list[0];
 
> -215
```

从此以后再也不用判断index到头然后改成0了...


## 字典的键值对取代switch语句

使用字典取代switch和if else语句也是函数式编程的理念之一.

```ts
const day = 'Monday';
 
({
 
  'Monday':()=>{},
  'Wednesday':()=>{},
  'Friday':()=>{},
  'default':()=>{},
 
})[ day || 'default' ];
```

## ES6,7,8,9,10,11一吨的语法糖

不说了, ecmascript有太多够骚的语法糖, 也许这就是前端社区钟爱JS的原因, 自己去MDN上寻找吧.


##  JS自以为是的Truthy和Falsy

Truthy (真值)指的是在 布尔值 上下文中转换后的值为真的值。所有值都是真值，除非它们被定义为 falsy (即除了 false，0，""，null，undefined 和 NaN 外)。

JS 中的真值示例如下（将被转换为 true，if 后的代码段将被执行）：


```ts
if (true)
 
if ({})
 
if ([])
 
if (42)
 
if ("foo")
 
if (new Date())
 
if (-42)
 
if (3.14)
 
if (-3.14)
 
if (Infinity)
 
if (-Infinity)
```

falsy(虚值)是在 Boolean（https://developer.mozilla.org/en-US/docs/Glossary/Boolean） 上下文中已认定可转换为‘假‘的值.

在需要用到布尔类型值的上下文中使用强制类型转换(Type Conversion https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion)将值转换为布尔值，比如：在条件语句或者循环语句中

JavaScript中falsy值的例子 (通过 if 代码段将falsy值转换为false):

```ts
if (false)
 
if (null)
 
if (undefined)
 
if (0)
 
if (NaN)
 
if ('')
 
if ("")
 
if (document.all)
```

然而我不推荐在生产环境下利用逻辑或和逻辑与来判断truthy和falsy, 因为有时候人认为0是有意义的, 而[]是无意义的, 然而在JS里面, 对0和[]的真值判断是相反的.


## 利用Set对列表去重

```ts
[...new Set([42, 'foo', 42, 'foo', true, true])]
 
> (3) [42, "foo", true]
```

## 自定义toJSON方法(fuck原型)

将标准库的一些构造函数给他们赋予toJSON方法, 这样在JSON.stringify的时候就可以生成定制的json,而不是空的了, 这在http传输的时候会非常有用.

```ts
Date.prototype.toJSON = function () {
 
  return this.getTime();
}
 
Function.prototype.toJSON = function () {
 
  return this.toString();
 
}
 
RegExp.prototype.toJSON = function () {
 
  return this.toString();
 
}
 
JSON.stringify([new Date(),Array, /.*/]);
 
> "[1559795757062,"function Array() { [native code] }","/.*/"]"
```


## 使用getter和setter实现dom数据绑定
传送门: getter（https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get）, setter（https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set）


## 使用模板字符串实现html和css的模板引擎

```js
const unfold = list => list.map(li => `<li>${li.name}</li>`).join('');
 
// 导出模块
 
module.exports = data => `
 
  <html lang="en">
 
    <head>
 
      <title>${data.title}</title>
 
    </head>
 
    <body>
 
      <h1>${data.h1}</h1>
 
      <ul>${unfold(data.list)}</ul>
 
    </body>
 
  </html> `;
```


上面的node模块就是HTML的模板引擎, 可以完美的替代市面上的各种产品包括ejs,php,jsp以及Vue脚手架等, 最开心的是不用去学习他们的语法, 利用ES6的模板字符串就可以定制自己喜欢的语法.


同理, CSS和其他类型的标记语言, 都可以通过这种方式而不需要依赖于第三方包.

