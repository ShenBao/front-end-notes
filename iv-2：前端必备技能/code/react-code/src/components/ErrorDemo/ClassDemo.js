import React from 'react'

class ErrorDemo extends React.Component {
    constructor() {
        super()
        this.state = {
            num: 100
        }
    }
    clickHandler = () => {
        this.state.num() // ErrorBoundary 无法监听事件报错，需要自行 try-catch
    }
    componentDidMount() {
        // throw new Error('mounted error') // ErrorBoundary 可监听渲染过程的报错

        // setTimeout(() => {
        //     throw new Error('setTimeout error')
        // }, 1000)
    }
    render() {
        return <div>
            <p>error demo - class</p>
            <button onClick={this.clickHandler}>error</button>
        </div>
    }
}

export default ErrorDemo
