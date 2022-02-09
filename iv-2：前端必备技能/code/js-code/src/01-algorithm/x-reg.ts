/**
 * @description 正则表达式
 * @author 尘墨
 */

const str = '100abc'
const reg = /^\d+/

console.time('reg')
for (let i = 0; i < 100 * 10000; i++) {
    reg.test(str)
}
console.timeEnd('reg')

console.time('indexOf')
for (let i = 0; i < 100 * 10000; i++) {
    str.indexOf('100')
}
console.timeEnd('indexOf')