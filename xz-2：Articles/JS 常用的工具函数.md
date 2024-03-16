# JS常用的工具函数

## isArray 判断数组

```js
var toString = Object.prototype.toString;

// 可以通过 `toString()` 来获取每个对象的类型
// 一般返回值是 Boolean 类型的函数，命名都以 is 开头
function isArray(val) {
  return toString.call(val) === '[object Array]';
}
```

## isUndefined 判断Undefined

```js
// 直接用`typeof`判断
// 注意 typeof null === 'object'
function isUndefined(val) {
  return typeof val === 'undefined';
}
```

## isBuffer 判断 buffer

```js
// 先判断不是 `undefined`和`null`
// 再判断 `val`存在构造函数，因为`Buffer`本身是一个类
// 最后通过自身的`isBuffer`方法判断

function isBuffer(val) {
  return val !== null 
          && !isUndefined(val) 
          && val.constructor !== null 
          && !isUndefined(val.constructor)
          && typeof val.constructor.isBuffer === 'function' 
          && val.constructor.isBuffer(val);
}
```

什么是Buffer?

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

因为axios可以运行在浏览器和node环境中，所以内部会用到nodejs相关的知识。


## isFormData 判断FormData

```js
// `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上

function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}


// instanceof 用法

function C() {}
function D() {}

const c = new C()

c instanceof C // output: true   因为 Object.getPrototypeOf(c) === C.prototype

c instanceof Object // output: true   因为 Object.prototype.isPrototypeOf(c)

c instanceof D // output: false   因为 D.prototype 不在 c 的原型链上
```

## isObject 判断对

```js
// 排除 `null`的情况
function isObject(val) {
  return val !== null && typeof val === 'object';
}
```

## isPlainObject 判断 纯对象

纯对象：用{}或new Object()创建的对象。

```js
function isPlainObject(val) {
  if (Object.prototype.toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}


// 例子1
const o = {name: 'jay}
isPlainObject(o) // true

// 例子2
const o = new Object()
o.name = 'jay'
isPlainObject(o)   // true

// 例子3
function C() {}
const c = new C()
isPlainObject(c);  // false

// 其实就是判断目标对象的原型是不是`null` 或 `Object.prototype`
```

## isDate 判断 Date

```js
function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]';
}
```

## isFile 判断文件类型

```js
function isFile(val) {
  return Object.prototype.toString.call(val) === '[object File]';
}
```

## isBlob 判断Blob

```js
function isBlob(val) {
  return Object.prototype.toString.call(val) === '[object Blob]';
}
```

Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取。

## isFunction 判断函数

```js
function isFunction(val) {
  return Object.prototype.toString.call(val) === '[object Function]';
}
```

## isStream 判断是否是流

```js
// 这里`isObject`、`isFunction`为上文提到的方法
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
```

## isURLSearchParams 判断URLSearchParams

```js
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

// 例子
const paramsString = "q=URLUtils.searchParams&topic=api"
const searchParams = new URLSearchParams(paramsString);
isURLSearchParams(searchParams) // true
```

URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串，详情可看 MDN：

```js
var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

// 输出 
[ 'q', 'URLUtils.searchParams' ]
[ 'topic', 'api' ]

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```

## trim 去除首尾空格

```js
// `trim`方法不存在的话，用正则
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
```

## isStandardBrowserEnv 判断标准浏览器环境

```js
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}
```

但是官方已经不推荐使用这个属性navigator.product。

## forEach 遍历对象或数组

保留了英文注释，提升大家的英文阅读能力。

```js
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *  用一个函数去迭代数组或对象
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 * 如果是数组，回调将会调用value, index, 和整个数组
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 * 如果是对象，回调将会调用value, key, 和整个对象
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
 
function forEach(obj, fn) {
  // Don't bother if no value provided
  // 如果值不存在，无需处理
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  // 如果不是对象类型，强制转成数组类型
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    // 是数组，for循环执行回调fn
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    // 是对象，for循环执行回调fn
    for (var key in obj) {
       // 只遍历可枚举属性
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
```

所以，源码为什么不用forEach和for...in...呢？？？？？？？

## stripBOM删除UTF-8编码中BOM

```js
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
 
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}
```

所谓 BOM，全称是Byte Order Mark，它是一个Unicode字符，通常出现在文本的开头，用来标识字节序。

UTF-8主要的优点是可以兼容ASCII，但如果使用BOM的话，这个好处就荡然无存了。

