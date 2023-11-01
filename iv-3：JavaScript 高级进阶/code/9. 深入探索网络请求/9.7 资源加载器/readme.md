## 资源加载器


### 序
service worker是条路, 这也是一条路。 多一条路，多一条选择。


### 思路
网络请求后的数据，如果indexedBD里面没有，就存入。
反之，直接从indexedDB里面读取。
通过ver字段，来识别缓存是否过期。

### 特点
1. 资源加载支持简单的依赖关系
2. 缓存支持版本
3. 小巧
4. 进度，错误，完毕等事件支持

### demo
演示地址：<a href="https://xiangwenhu.github.io/rloader/" target="_blank">r-loader演示</a> 
```js
const resourcesInfo = [{
    pre: ["promise"],
    key: "axios",
    ver: "1.2",
    url: "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"
},{
    key: "mqtt",
    ver: "1.0",
    url: "https://cdnjs.cloudflare.com/ajax/libs/mqtt/4.2.6/mqtt.min.js"
},{
    key: "lottie",
    url: "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.8/lottie.min.js"
},{
    key: "flv",
    url: "https://cdnjs.cloudflare.com/ajax/libs/flv.js/1.5.0/flv.min.js"
},
{
    key: "promise",
    url: "https://cdnjs.cloudflare.com/ajax/libs/promise-polyfill/8.2.0/polyfill.min.js"
}];


let startTime;

const rl = new ResourceLoader(resourcesInfo, idb);

rl.on("progress", (progress, info)=>{
    console.log("progress:", progress,  info);
});

rl.on("completed", (datas)=>{
    console.log("completed event:", datas);    
    console.log("total time:", Date.now() - startTime)
});

rl.on("loaded", (datas)=>{
    console.log("loaded event:", datas);    
    console.log("total time:", Date.now() - startTime)
});

rl.on("error", (error, info)=>{
    console.log("error event:", error.message, info);
});

```
