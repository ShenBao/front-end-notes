const array = [2, 3, 4];

//检查数组中是否包含元素
function inArrayCompare(arr, num) {
    if (arr.indexOf(num) > -1) {
        return true;
    }
    return false;
}


function inArray(arr, val) {
    // -1 不存在, ~ -1 == 0, 布尔值为 false
    // 其他情况为真值，表示存在
    if (~arr.indexOf(val)) {
        return true;
    }
    return false;
}


const print = console.log;
print(inArrayCompare(array,2));
print(inArray(array,2));
