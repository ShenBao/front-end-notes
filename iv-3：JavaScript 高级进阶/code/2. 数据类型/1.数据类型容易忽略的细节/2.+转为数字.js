const print = console.log;

function toNumber(val) {
    const result = +val;
    print(result);
    return result
}

// 传统数据类型
// toNumber(null) // NaN
// toNumber(undefined) // NaN
// toNumber(1) // 1
// toNumber("123aa") // NaN
// toNumber({}) // NaN
// toNumber(true) // 1

// ES6的 bigInt和Symbol

// toNumber(10n)
toNumber(Symbol.for("a"))