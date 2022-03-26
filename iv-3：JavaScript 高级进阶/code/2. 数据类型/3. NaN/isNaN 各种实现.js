function isNaNVal(val) {
    return Object.is(val, NaN);
}

function isNaNVal(val) {
    return val !== val;
}

function isNaNVal(val) {
    return typeof val === 'number' && isNaN(val)
}

// 综合垫片
if (!("isNaN" in Number)) {
    Number.isNaN = function(val) {
        return typeof val === 'number' && isNaN(val)
    }
}