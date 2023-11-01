/**
 * @description 实现 new
 * @author 尘墨
 */

export function customNew<T>(constructor: Function, ...args: any[]): T {
    // 1. 创建一个空对象，继承 constructor 的原型
    const obj = Object.create(constructor.prototype)
    // 2. 将 obj 作为 this ，执行 constructor ，传入参数
    constructor.apply(obj, args)
    // 3. 返回 obj
    return obj
}

// class Foo {
//     // 属性
//     name: string
//     city: string
//     n: number

//     constructor(name: string, n: number) {
//         this.name = name
//         this.city = '北京'
//         this.n = n
//     }

//     getName() {
//         return this.name
//     }
// }

// const f = new Foo('尘墨', 100)
// // const f = customNew<Foo>(Foo, '尘墨', 100)
// console.info(f)
// console.info(f.getName())