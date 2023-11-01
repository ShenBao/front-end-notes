// console.info('index')

console.info('start')
setImmediate(() => {
    console.info('setImmediate')
})
setTimeout(() => {
    console.info('timeout')
})
Promise.resolve().then(() => {
    console.info('promise then')
})
// process.nextTick(() => {
//     console.info('nextTick')
// })
console.info('end')
