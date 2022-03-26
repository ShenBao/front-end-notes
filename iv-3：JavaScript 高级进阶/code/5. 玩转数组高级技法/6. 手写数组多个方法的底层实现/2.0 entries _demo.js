const arr = [1,undefined, null, {}];

console.log(arr.entries());
// next访问
const iter = arr.entries();
console.log("next:", iter.next());

// for of迭代
for(let [k, v] of arr.entries()){
    console.log(k, v)
}

