# React 错误监听

## 题目

如何统一监听 React 组件报错？

## 分析

真实项目需要**闭环**，即考虑各个方面，除了基本的功能外，还要考虑性能优化、报错、统计等。
而个人项目、实验项目一般以实现功能为主，不会考虑这么全面。

## ErrorBoundary

- React 16+ 引入。可以监听所有**下级**组件报错，同时降级展示 UI 。
- 只监听组件渲染时报错，不监听 DOM 事件、异步错误
- production 环境生效，dev 会直接抛出错误

代码参考 ErrorBoundary.js 和 components/ErrorDemo

```js
import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null // 存储当前的报错信息
        }
    }
    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        console.info('getDerivedStateFromError...', error)
        return { error }
    }
    componentDidCatch(error, errorInfo) {
        // 统计上报错误信息
        console.info('componentDidCatch...', error, errorInfo)
    }
    render() {
        if (this.state.error) {
            // 提示错误
            return <h1>报错了</h1>
        }

        // 没有错误，就渲染子组件
        return this.props.children
    }
}

export default ErrorBoundary
```

建议应用到最顶层，监听全局错误

```jsx
// index.js 入口文件
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
```

函数组件中也可以使用

```js
function App(props) {
    return <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
}
```

## dev 和 build

dev 环境下无法看到 ErrorBoundary 的报错 UI 效果。会显示的提示报错信息。<br>
`yarn build` 之后再运行，即可看到 UI 效果。

## 事件报错

React 不需要 ErrorBoundary 来捕获事件处理器中的错误。与 `render` 方法和生命周期方法不同，事件处理器不会在渲染期间触发。

如果你需要在事件处理器内部捕获错误，使用普通的 `try-catch` 语句。也可以使用全局的 `window.onerror` 来监听。

## 异步错误

ErrorBoundary 无法捕捉到异步报错，可使用 `window.onerror` 来监听。

```js
window.onerror = function(msg, source, line, column, error) {
    console.log('window.onerror---------', msg, source, line, column, error)
}
// 注意，如果用 window.addEventListener('error', event => {}) 参数不一样！！！
```

## 答案

- ErrorBoundary 监听渲染时报错
- 事件报错使用 `try-catch` 和 `window.onerror` 捕获
- 异步报错使用 `window.onerror`

## 扩展

Promise 监听报错要使用 `window.onunhandledrejection` 。

前端拿到错误监听之后，需要传递给服务端，进行错误收集和分析，然后修复 bug 。

JS 报错统计（埋点、上报、统计）
