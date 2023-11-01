const print = console.log;
print(String.fromCodePoint(131104))  // "𠀠" 正确
// 可以正确获取码点小于 0xFFFF 65535字符
print(String.fromCharCode(131104))   // " "  错误
print(String.fromCharCode(20154))    // "人" 正确
print(String.fromCharCode(97))       // "a"  正确