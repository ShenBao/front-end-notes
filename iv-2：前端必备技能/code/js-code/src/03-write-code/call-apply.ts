/**
 * @description 自定义 call apply
 * @author 尘墨
 */

// @ts-ignore
Function.prototype.customCall = function (context: any, ...args: any[]) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

    const fnKey = Symbol() // 不会出现属性名称的覆盖
    context[fnKey] = this // this 就是当前的函数

    const res = context[fnKey](...args) // 绑定了 this

    delete context[fnKey] // 清理掉 fn ，防止污染

    return res
}

// @ts-ignore
Function.prototype.customApply = function (context: any, args: any[] = []) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

    const fnKey = Symbol() // 不会出现属性名称的覆盖
    context[fnKey] = this // this 就是当前的函数

    const res = context[fnKey](...args) // 绑定了 this

    delete context[fnKey] // 清理掉 fn ，防止污染

    return res
}

function fn(this: any, a: any, b: any, c: any) {
    console.info(this, a, b, c)
}
// // @ts-ignore
// fn.customCall({x: 100}, 10, 20, 30)
// @ts-ignore
// fn.customApply({x: 200}, [100, 200, 300])
