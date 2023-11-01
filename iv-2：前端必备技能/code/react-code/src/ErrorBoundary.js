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