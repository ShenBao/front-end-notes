let array=[1,2,3,4,5,6,7];

array.pop();
console.log("array pop:",array);

array.shift();
console.log("array shift:",array);


array.unshift("unshift");
console.log("array unshift:",array);


array.push("push")
console.log("array push:",array);


array.reverse()
console.log("array reverse:",array);

array.sort()
console.log("array sort:",array);

array.splice(2,1)
console.log("array splice:",array);

array.copyWithin(2,0)
console.log("array copyWithin:",array);

array.fill("fill",3)
console.log("array fill:",array);