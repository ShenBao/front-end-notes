

function sum(num) {
    if (num === 1) {
        debugger
        return 1
    }
    return num + sum(num - 1)
}

sum(5)


// 浏览器中执行
sum(10464)

// chrome浏览器中爆栈
// sum(10465)