console.log("\\u0061:", "\u0061") // "a"

// console.log("\u061")  // 报错

// 多余4位直接追加
console.log('\\u00610:', '\u00610')  // 'a0'

// Unicode的代理区 0xD800-0xDFFF， 其不代表任何字符

console.log('\\uD800:', '\uD800' )
console.log('\\uD800:', '\uDFFF' )