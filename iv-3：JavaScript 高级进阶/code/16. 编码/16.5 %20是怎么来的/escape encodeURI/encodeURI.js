
// 获取字符串 utf-8 编码后的二进制串
// 比如 人（三个字节） => 11100100 10111010 10111010
function to_binary(str) {
    const string = str.replace(/\r\n/g, "\n");
    let result = "";
    let code;
    for (var n = 0; n < string.length; n++) {
        //获取麻点
        code = str.charCodeAt(n);
        if (code < 0x007F) { // 1个字节
            // 0000 0000 ~ 0000 007F  0 ~ 127 1个字节

            // (code | 0b100000000).toString(2).slice(1)
            result += (code).toString(2).padStart(8, '0');
        } else if ((code > 0x0080) && (code < 0x07FF)) {
            // 0000 0080 ~ 0000 07FF	128 ~ 2047 2个字节
            // 0x0080 的二进制为 10000000 ，8位，所以大于0x0080的，至少有8位
            // 格式 110xxxxx 10xxxxxx     

            // 高位 110xxxxx
            result += ((code >> 6) | 0b11000000).toString(2);
            // 低位 10xxxxxx
            result += ((code & 0b111111) | 0b10000000).toString(2);
        } else if (code > 0x0800 && code < 0xFFFF) {
            // 0000 0800 ~ 0000 FFFF	2048 ~ 65535	3个字节
            // 0x0800的二进制为 1000 00000000，12位，所以大于0x0800的，至少有12位
            // 格式 1110xxxx 10xxxxxx 10xxxxxx

            // 最高位 1110xxxx
            result += ((code >> 12) | 0b11100000).toString(2);
            // 第二位 10xxxxxx
            result += (((code >> 6) & 0b111111) | 0b10000000).toString(2);
            // 第三位 10xxxxxx
            result += ((code & 0b111111) | 0b10000000).toString(2);
        } else {
            // 0001 0000 ~ 0010 FFFF   65536 ~ 1114111   4个字节 
            // https://www.unicode.org/charts/PDF/Unicode-13.0/U130-2F800.pdf
            throw new TypeError("暂不支持码点大于65535的字符")
        }
    }
    return result;
}

// utf-8的编码后的二进制串 转为 %XX的格式
// 类似encodeURI/encodeURIComponent, 但是未处理不需要编码的字符
function myEncodeURI(str) {
    // 获取utf-8编码后的二进制
    const bites = to_binary(str);
    // 计算字节数
    const byteCount = bites.length / 8;

    // 8个分组， 为一个字节
    // ['00111111','11111100' ]
    const groups = Array.from({
        length: byteCount
    }, (val, index) => {
        return bites.substring(index * 8, index * 8 + 8)
    })
    console.log('byte groups:', groups.join(' '))

    // 0b11111111
    // eval(0b11111111) => 十进制
    // eval(0b11111111).toString(16) => 16进制
    const codes = groups.map(v => eval(`0b${v}`).toString(16).toUpperCase());
    return '%' + codes.join('%')
}

const testArr = [' ', '人'];

console.log("str:", testArr[0])
console.log('codes:'.padEnd(10, ' '), myEncodeURI(testArr[0]));
console.log('encodeURI:', encodeURI(testArr[0]))

console.log();
console.log("str:", testArr[1])
console.log('codes:'.padEnd(10, ' '), myEncodeURI(testArr[1]));
console.log('encodeURI:', encodeURI(testArr[1]))


