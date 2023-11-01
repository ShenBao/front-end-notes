/**
 * @description 获取数据类型
 * @author 尘墨
 */

/**
 * 获取详细的数据类型
 * @param x x
 */
export function getType(x: any): string {
    const originType = Object.prototype.toString.call(x) // '[object String]'
    const spaceIndex = originType.indexOf(' ')
    const type = originType.slice(spaceIndex + 1, -1) // 'String'
    return type.toLowerCase() // 'string'
}

// // 功能测试
// console.info( getType(null) ) // 'null'
// console.info( getType(undefined) )
// console.info( getType(100) )
// console.info( getType('abc') )
// console.info( getType(true) )
// console.info( getType(Symbol()) )
// console.info( getType({}) )
// console.info( getType([]) )
// console.info( getType(() => {}) )
