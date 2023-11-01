## 统计事件监听程序
我们使用`addEventListener`添加和`removeEventListener`删除事件处理程序，可是你知道你的节点上
* 添加了多少种类型的事件
* 每种事件又有多少事件处理程序

控制台提供了一个获取所有事件处理程序的方法，名为： `getEventListeners`
```js
getEventListeners(document.body)

// {click: Array(1)}
```

然后，日常编程中并不可以使用。

这里就得提及到DOM事件了，DOM的事件，基本可以分为DOM0和DOM2，

DOM级别的比较简单, 直接在节点上`on[EventType]`即可，比如在body节点上注册点击事件。

```js
document.body.onclick = function(){
    ......
}
```
其本质是一种属性，优点：
1. 高效
2. 一定程序可以复制

我们目前主流的当然还是DOM2级别的事件，也就是`addEventListener`添加和`removeEventListener`，其本质上都是 [EventTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget), 其原型上一共有三个方法

1. EventTarget.addEventListener()   
在EventTarget上注册特定事件类型的事件处理程序。
2. EventTarget.removeEventListener()   
EventTarget中删除事件侦听器。
3. EventTarget.dispatchEvent()   
将事件分派到此EventTarget。

这里还要拓展一下知识点，元素一共有12中类型，我们最常用的是 type为1的元素节点，我们这里就称为 Element。

```js
Window <=  EventTarget
```

```js
Document <=  EventTarget
```

```js
Element <= Node <=  EventTarget
```
这三个继承关系，就表明Node, Element, Document, Window都继承了 EventTarget， 所以我们要坚挺到所有的事件注册和监听就要从 EventTarget 下面。


思路就是装饰或者代理addEventListener，让我们可以添加额外的代码来收集信息。

