/**
 * @description 深拷贝
 * @author 尘墨
 */

// /**
//  * 深拷贝 - 只考虑了简单的数组、对象
//  * @param obj obj
//  */
// function cloneDeep(obj: any) {
//     if (typeof obj !== 'object' || obj == null ) return obj

//     let result: any
//     if (obj instanceof Array) {
//         result = []
//     } else {
//         result = {}
//     }

//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {            
//             result[key] = cloneDeep(obj[key]) // 递归调用
//         }
//     }

//     return result
// }
// // 功能测试
// const a: any = {
//     set: new Set([10, 20, 30]),
//     map: new Map([['x', 10], ['y', 20]])
// }
// a.self = a
// console.log( cloneDeep(a) ) // 无法处理 Map Set 和循环引用

/**
 * 深拷贝
 * @param obj obj
 * @param map weakmap 为了避免循环引用
 */
export function cloneDeep(obj: any, map = new WeakMap()): any {
    if (typeof obj !== 'object' || obj == null ) return obj

    // 避免循环引用
    const objFromMap = map.get(obj)
    if (objFromMap) return objFromMap

    let target: any = {}
    map.set(obj, target)

    // Map
    if (obj instanceof Map) {
        target = new Map()
        obj.forEach((v, k) => {
            const v1 = cloneDeep(v, map)
            const k1 = cloneDeep(k, map)
            target.set(k1, v1)
        })
    }

    // Set
    if (obj instanceof Set) {
        target = new Set()
        obj.forEach(v => {
            const v1 = cloneDeep(v, map)
            target.add(v1)
        })
    }

    // Array
    if (obj instanceof Array) {
        target = obj.map(item => cloneDeep(item, map))
    }

    // Object
    for (const key in obj) {
        const val = obj[key]
        const val1 = cloneDeep(val, map)
        target[key] = val1
    }

    return target
}

// // 功能测试
// const a: any = {
//     set: new Set([10, 20, 30]),
//     map: new Map([['x', 10], ['y', 20]]),
//     info: {
//         city: '北京'
//     },
//     fn: () => { console.info(100) }
// }
// a.self = a
// console.log( cloneDeep(a) )
