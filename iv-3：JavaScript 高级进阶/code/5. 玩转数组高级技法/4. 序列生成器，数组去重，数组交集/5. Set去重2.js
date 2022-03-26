function uniqueArray(arr){
    return Array.from(new Set(arr))
}

const arr = [{a:1}, {a:1}];
console.log("set 不同引用：",uniqueArray(arr)); 

const obj1 = {a:1}
const arr2 = [obj1, obj1];
console.log("set 同一引用：",uniqueArray(arr2)); 

