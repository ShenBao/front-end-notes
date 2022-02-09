/**
 * @description curry add
 * @author 尘墨
 */

export function curry(fn: Function) {
    const fnArgsLength = fn.length // 传入函数的参数长度
    let args: any[] = []

    // ts 中，独立的函数，this 需要声明类型
    function calc(this: any, ...newArgs: any[]) {
        // 积累参数
        args = [
            ...args,
            ...newArgs
        ]
        if (args.length < fnArgsLength) {
            // 参数不够，返回函数
            return calc
        } else {
            // 参数够了，返回执行结果
            return fn.apply(this, args.slice(0, fnArgsLength))
        }
    }

    return calc
}

// function add(a: number, b: number, c: number): number {
//     return a + b + c
// }
// // add(10, 20, 30) // 60

// const curryAdd = curry(add)
// const res = curryAdd(10)(20)(30) // 60
// console.info(res)