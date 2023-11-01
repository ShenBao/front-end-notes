import { useState, useEffect } from 'react'

function useEffectDemo() {
    const [value, setValue] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(value)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [value])

    function clickHandler() {
        setValue(value + 1)
    }

    return <div>
        value: {value} <button onClick={clickHandler}>increase</button>
    </div>
}

export default useEffectDemo
