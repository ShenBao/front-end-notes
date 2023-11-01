
function intersectSet(arr1, arr2){
    return [...new Set(arr1)].filter(item =>arr2 .includes(item))
}

// 原始数据类型
function intersectMap(arr1, arr2){ 
    const map = new Map();
    arr1.forEach(val=> map.set(val))

    return arr2.filter(val=> {
        return map.has(val);
    });
}

function createData(length){    
    return Array.from({length}, (val, i)=> {
        return ~~(Math.random()* length)
    })
}

console.time("createData")
var data1 = createData(100000);
var data2 = createData(100000);
console.timeEnd("createData")

console.time("intersectSet");
intersectSet(data1, data2);
console.timeEnd("intersectSet");


console.time("intersectBase");
intersectMap(data1, data2);
console.timeEnd("intersectBase");
