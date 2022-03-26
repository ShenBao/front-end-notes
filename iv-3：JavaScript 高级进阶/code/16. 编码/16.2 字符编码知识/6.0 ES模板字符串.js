// 61 = "a".charCodeAt(0).toString(16)
console.log(`我\u{61}`)  // 我a
console.log(`我\x61`)    // 我a
console.log(`我\u0061`)  // 我a
console.log(`我\a`);      // 我a

// 141 = "a".charCodeAt(0).toString(8)
// `我\141`   // 一场

console.log(`我${'\141'}`)   // '我a'