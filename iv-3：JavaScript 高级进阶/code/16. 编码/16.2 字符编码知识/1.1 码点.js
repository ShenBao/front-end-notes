const print = console.log;

print('𠀠'.codePointAt(0))  // 131104 0x20020  正确
// charCodeAt可以正确获取小于0xFFFF(65535)的码点
print('𠀠'.charCodeAt(0))  // 55360  0xd840   错误
print('a'.charCodeAt(0))    // 97     0x0061   正确

