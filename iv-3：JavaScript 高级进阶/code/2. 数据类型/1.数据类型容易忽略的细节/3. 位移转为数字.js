const print = console.log;
function toNumber(val){
    const result = val >> 0
    print(result)
    return result
}
function toNumber2(val){
    const result = val >>> 0
    print(result)
    return result
}

// toNumber(null)  // 0
// toNumber({})    // 0
// toNumber("10x") // 0
// toNumber("10")  // 10



// 超大的数
toNumber(Number.MAX_SAFE_INTEGER)   // -1
toNumber2(Number.MAX_SAFE_INTEGER)  // 4294967295 



// toNumber2(Number.MAX_SAFE_INTEGER)  => 4294967295 

var val = Number.MAX_SAFE_INTEGER.toString(2)  
// 11111111111111111111111111111111111111111111111111111
var val1 = val.substring(0,32) 
// 11111111111111111111111111111111

var num = parseInt(val1, 2)
// 4294967295

// console.log(num)



// toNumber(Number.MAX_SAFE_INTEGER)   => -1
// 有符号数字，最高位为符号位。

// 十进制变二进制：原码 => 反码 加一（补码）
// 二进制变十进制：减一 =>反码 = 原码。

var val = Number.MAX_SAFE_INTEGER.toString(2)  
// 11111111111111111111111111111111111111111111111111111

var val1 = val.substring(0,32)
// 11111111111111111111111111111111

// 减1
// 11111111111111111111111111111110

// 取反, 
// 00000000000000000000000000000001  = 1

// 因为其最高位1是负数
-1
