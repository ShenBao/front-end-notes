# setState

## 题目

React 中以下代码会输出什么

```js
class Example extends React.Component {
    constructor() {
      super()
      this.state = { val: 0 }
    }
  
    componentDidMount() {
      // this.state.val 初始值是 0 

      this.setState({val: this.state.val + 1})
      console.log(this.state.val)
  
      this.setState({val: this.state.val + 1})
      console.log(this.state.val)
  
      setTimeout(() => {
        this.setState({val: this.state.val + 1})
        console.log(this.state.val)
  
        this.setState({val: this.state.val + 1})
        console.log(this.state.val)
      }, 0)
    }
  
    render() {
      return <p>{this.state.val}</p>
    }
}
```

## 关于 setState 的两个考点

- state 同步更新 or 异步更新
- state 合并 or 不合并

默认情况：
- state 默认异步更新
- state 默认会合并后更新

## setState 默认异步更新

```js
componentDidMount() {
  this.setState({val: this.state.val + 1}, () => {
    // 回调函数可以拿到最新值
    console.log('callback', this.state.val)
  })
  console.log(this.state.val) // 拿不到最新值
}
```

## setState 默认会合并

多次执行，最后 render 结果还是 `1`

```js
componentDidMount() {
  this.setState({val: this.state.val + 1})
  this.setState({val: this.state.val + 1})
  this.setState({val: this.state.val + 1})
}
```

## setState 有时同步更新

根据 `setState` 的**触发时机是否受 React 控制**

如果触发时机在 React 所控制的范围之内，则**异步更新**
- 生命周期内触发
- React JSX 事件内触发

如果触发时机不在 React 所控制的范围之内，则**同步更新**
- setTimeout setInterval
- Promise then
- 自定义的 DOM 事件
- ajax 网络请求回调

**注意：React 18 中不一样**
- 上述场景，在 React 18 中可以异步更新(Auto Batch)
- 需将 ReactDOM.render 替换成 ReactDOM.createRoot

## setState 有时不会合并

- 同步更新，不会合并
- 传入函数，不会合并 （对象可以 `Object.assign`，函数无法合并）

```js
this.setState((prevState, props) => {
  return { val: prevState.val + 1 }
})
```

## 答案

题目代码执行打印 `0 0 2 3`

## 重点

`setState` 是 React 最重要的 API ，三点：
- 使用不可变数据
- 合并 vs 不合并
- 异步更新 vs 同步更新

## 扩展 --- setState 是微任务还是宏任务

- 异步，可讨论是 微任务/宏任务
- 同步，则无所谓 微任务/宏任务

**结论：setState 本质是同步**
- setState 是同步，只不过让 React 做成了异步的样子
- 因为要考虑性能，多次 state 修改，只进行一次 DOM 渲染
- 日常说的“异步”是不严谨的，但沟通成本低

**答案**
- setState 是同步执行， state 都是同步更新
- 即，在微任务 Promise then 开始之前， state已经计算完了
- 同步，不是微任务或宏任务
