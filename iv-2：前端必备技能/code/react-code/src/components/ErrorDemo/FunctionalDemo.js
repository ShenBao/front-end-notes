import { useState, useEffect } from 'react'

function ErrorDemo() {
    const [num] = useState(100)

    function clickHandler() {
        num() // ErrorBoundary 无法监听事件报错，需要自行 try-catch
    }

    useEffect(() => {
        // throw new Error('mounted error') // ErrorBoundary 可监听渲染过程的报错
    }, [])

    return <div>
        <p>error demo - functional</p>
        <button onClick={clickHandler}>error</button>
    </div>
}

export default ErrorDemo
