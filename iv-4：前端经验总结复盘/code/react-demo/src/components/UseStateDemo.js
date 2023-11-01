import { useState, useEffect } from 'react'

function useStateDemo() {
    const [value, setValue] = useState(100)

    function clickHandler() {
        // // 1. 传入常量，state 会合并
        // setValue(value + 1)
        // setValue(value + 1)
        // console.log(1, value) // 100
        // // 2. 传入函数，state 不会合并
        // setValue(value => value + 1)
        // setValue(value => value + 1)
        // console.log(2, value) // 100

        // 3. setTimeout 中，React18 开始也会合并 state （之前版本会同步更新，不合并）
        setTimeout(() => {
            setValue(value + 1)
            setValue(value + 1)
            console.log(1, value) // 100

            setValue(value + 1)
            setValue(value + 1)
            console.log(2, value) // 100
        })

        // // 4. 同理 setTimeout 中，传入函数，state 也不会合并
        // setTimeout(() => {
        //     setValue(value => value + 1)
        //     setValue(value => value + 1)
        //     console.log(1, value)
        // })
    }

    useEffect(() => {
        // 自绑定 DOM 事件，React18 开始也会合并 state（之前版本会同步更新，不合并）
        document.getElementById('btn2').addEventListener('click', () => {
            setValue(value + 1)
            setValue(value + 1)
            console.log(1, value)
        })
    })

    return <div>
        <span>{value}</span>
        <button onClick={clickHandler}>increase1</button>
        <button id="btn2">increase2</button>
    </div>
}

export default useStateDemo
