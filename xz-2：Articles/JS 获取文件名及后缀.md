# JS 获取文件名及后缀

```ts
var name = "xxx.yyy.txt";
```

## 文件名

```ts
name.substring(0, name.lastIndexOf(".")); 

name.replace(/\.\w+$/,'');

name.substr(0, name.lastIndexOf(".")); 
```


## 后缀

### 方式一：subtring()

使用 subtring() 截取字符串，对于文件名中会出现多个点的很有用，从最后一个点的地方截取。

```ts
var suffix = name.substring(name.lastIndexOf(".")); // .txt
var suffix = name.substring(name.lastIndexOf(".") + 1); // txt
```

### 方式二：正则

```ts
var suffix = name.match(/.[^.]+$/)[0]; // .txt
var suffix = name.match(/[^.]+$/)[0]; // txt
```

### 方式三：转数组

```ts
var suffix = "." + name.split(".").pop(); // .txt
var suffix = name.split(".").pop(); // txt
```

### 方式四：substr()

```ts
var suffix = name.substr(name.lastIndexOf(".")); // .txt
var suffix = name.substr(name.lastIndexOf(".") + 1); // txt
```

### 其他方式

```ts
name.split('.')[name.split('.').length-1]
name.replace(/.+\./,"")；
```
