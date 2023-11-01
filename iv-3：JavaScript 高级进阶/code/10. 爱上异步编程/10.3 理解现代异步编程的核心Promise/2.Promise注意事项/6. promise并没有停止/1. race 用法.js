

let p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('执行p1');
        resolve('https://aaa.flv 开始播放')
    }, 5000)
})
let p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('执行p2');
        resolve('https://bbb.flv 开始播放')
    }, 2000)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('执行p3');
        reject('https://ccc.flv 播放失败')
    }, 1000)
})

Promise.race([p1, p2, p3]).then((res) => {
    console.log("已经获取到合适的结果了===", res);
})