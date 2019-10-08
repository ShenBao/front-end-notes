# code-1

queryURLParmeter 方法，将url参数解析成对象键值对的方式

```js
// 一：字符串分割
function queryURLParameter(url) {
    let obj = {};
    if (url.indexOf('?') < 0) {
        return obj;
    }
    let ary = url.split('?');
    urlParameter = ary[1];

    let data = urlParameter.split('&');
    for (var i = 0; i < data.length; i++) {
        let curl = data[i],
            curAry = curl.split('=');
        obj[curAry[0]] = curAry[1];
    }
    return obj;
}

var data = queryURLParameter(url);


// 二：正则
function queryURLParameter(url) {
    let reg = /([^&?=]+)=([^&?=]+)/g,
        obj = {};
    url.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    })
    return obj;
}

var data = queryURLParameter(url);

// 三: 写到字符串原型中
String.prototype.myQueryURLParameter = function () {
    let reg = /([^&?=]+)=([^&?=]+)/g,
        obj = {};
    this.replace(reg, (...arg) => {
        obj[arg[1]] = arg[2]
    });
    return obj;
}

console.log(url.myQueryURLParameter());
```


```js
var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b (1, 2, 3);
console.log(a);

// 3
// 10
// undefined
```

```js
"use strict"
var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b (1, 2, 3);
console.log(a);

// 3
// 3
// undefined
```

js 的非严格模式下：函数的实参集合与形参变量存在“映射”关系，不管其中一个谁改变了另一个也会发生变化

js 的严格模式下，arguments 和形参变量关系被掐断，互不干扰



```js
var num = 10;
var obj = {
    num: 20
};
obj.fn = (function(num) {
    this.num = num * 3;
    num ++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    }
})(obj.num);

var fn = obj.fn;

fn(5);

obj.fn(10);

console.log(num, obj.num);

// 22
// 23
// 65 30
```


循环事件绑定
```js
var btnBox = document.getElementById('btnBox'),
    inputs = btnBox.getElementsByTagName('input');
var l = inputs.length;

// 自定义属性
for (var i = 0; l; i++) {
    inputs[i].myIndex = i;
    inputs[i].onclick = function () {
        console.log(this.myIndex);
    }
}

// 闭包 1 
for (var i = 0; l; i++) {
    ~function (i) {
        inputs[i].onclick = function () {
            console.log(i);
        }
    }(i);
}

// 闭包 2
for (var i = 0; l; i++) {
    inputs[i].onclick = (function (i) {
        return function () {
            console.log(i);
        }
    })(i);
}

// es6 块级作用域
for (let i = 0; l; i++) {
    inputs[i].onclick = function () {
        console.log(i);
    }
}
```

```js
var  fullName = 'language';
var obj = {
    fullName: 'js',
    prop: {
        getFullName: function() {
            return this.fullName;
        }
    }
}

console.log(obj.prop.getFullName());  // this: obj.prop
var test = obj.prop.getFullName; // this: window
console.log(test());

// undefined
// language
```


```js
var name = 'window';
var Tom = {
    name: 'Tom',
    show: function() {
        console.log(this.name);
    },
    wait: function() {
        var fun = this.show;
        fun();
    }
}

Tom.wait();

// window
```


## 数组去重

```js
var pro = Array.prototype;
pro.distinct = function () {
    var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}
var arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1];
arra.distinct();    //返回[3,4,2,1]
```

```js
var pro = Array.prototype;
pro.distinct = function () {
    var obj = {};
    for (let i = 0; i < this.length; i++) {
        var item = this[i];
        if (typeof obj[item] !== 'undefined') {
            this[i] = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[item] = item;
    }
    obj = null;
    return this;
}
var arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1];
arra.distinct();    //返回[1, 2, 3, 4]
```

```js
function dedupe(array){
 return Array.from(new Set(array));
}
dedupe([1,1,2,3]) //[1,2,3]
// (3) [1, 2, 3]


let arr = [1,2,3,3];
let resultarr = [...new Set(arr)];
console.log(resultarr); //[1,2,3]
```


document.parentNode 和 document.parentnode 区别

前者父节点不存在，古为 null ,后者没有此属性，所有为undefined


undefined：
1. 变量提升：只声明未定义默认值 undefined
2. 严格模式下：没有明确的执行主体，this 就是 undefined
3. 对象没有这个属性名，属性值就是 undefined
4. 函数定义形参不传值，默认为 undefined
5. 函数没有返回值: 默认返回的就是 undefined

null：
1. 手动设置变量的值或对象的属性值为 null (此时不赋值，后面再赋值)
2. js 的 dom 元素获取中，如果没有获取到指定的元素对象，结构一般都是 null
3. Object.prototype.__proto__ 的值是 null
4. 正则捕获的时候，没有捕获到结果，默认值是 null


避免函数重命名的问题
- 闭包
- 单例模式
