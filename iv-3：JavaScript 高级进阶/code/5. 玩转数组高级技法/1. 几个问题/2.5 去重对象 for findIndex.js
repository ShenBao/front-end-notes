const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 3 }, { id: 4 }, { id: 5 }];

function mergeArray(arr1, arr2) {
    // 克隆
    var arr = arr1.slice(0);
    var v;
    for (var i = 0; i < arr2.length; i++) {
        v = arr2[i];
        // 这个操作，
        // 详情参见4.2位运算符的妙用：奇偶数，色值换算，换值， 编码等
        if (~arr.findIndex(el=> el.id === v.id)) {
            continue;
        }
        arr.push(v)
    }
    return arr
}

console.log(mergeArray(arr1, arr2))