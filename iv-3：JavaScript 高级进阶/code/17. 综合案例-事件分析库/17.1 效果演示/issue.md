

## EventEmitter events模块

events其实支持了`newListener`和`removeListener`的监听事件。
* newListener 有事件添加时触发
* removeListener 有事件移除时触发


- [x] once底层肯定是调用on(addListener)， 如果避免监听
    once可以监听，其底层依旧会调用removeListner,只不过我们需要监听的真实被调用函数

- [ ] removeAllListeners
其可能不走挨个删除，所以必须监听此事件。

- [ ] prependListener 并未走原型 addListener
需要代理

- [x] 被bind后的函数，不返回源码
http://cn.voidcc.com/question/p-bpwagzik-be.html  
https://stackoverflow.com/questions/40451661/why-is-bound-function-tostring-not-returning-the-original-source-code
https://stackoverflow.com/questions/35686850/determine-if-a-javascript-function-is-a-bound-function
```js
function f(a){ return a } 
var g = f.bind(null); 
g.toString() // chrome: function() { [native code] }
```

- [x] options相同判定
  只与`capture`参数有关

- [x] type 是Symbol, String
- [ ] 优化在node环境的结果输出 


## EventEmitter component-emitter模块
`socket.io-client` Client继承与 component-emitter 
https://www.npmjs.com/package/component-emitter
https://github.com/component/emitter

其比较简单，只有简单的on , off

- [x] off, removeListener通过参数可能全部删除，也可能删除某个类别


