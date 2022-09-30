import { useEffect } from 'react'

function HeartBeat() {
    useEffect(() => {
        let timer = 0
        function fn() {
            console.log('hello')
            timer = setTimeout(fn, 1000) // “心跳”尽量避免使用 setInterval ，有坑
        }
        timer = setTimeout(fn, 1000)

        return () => {
            clearTimeout(timer) // 组件销毁时，一定清除定时器
        }
    })

    return <p>心跳</p>
}

export default HeartBeat
