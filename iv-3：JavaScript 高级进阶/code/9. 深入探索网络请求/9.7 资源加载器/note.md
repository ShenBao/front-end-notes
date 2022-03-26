
参考:

[IndexedDB_API ](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 提到了很多优秀的封装库 



### 流程
1. 检查idb里面有没有对应的key值
2. 没有 ：走网络下载，创建访问url, 并存入idb
3. 有： 读取idb创建访问url


### 思考

* fetch或者ajax下载blob还是直接拦截script的load事件
* js之间加载的顺序要求
* 所以资源加载完毕的回调