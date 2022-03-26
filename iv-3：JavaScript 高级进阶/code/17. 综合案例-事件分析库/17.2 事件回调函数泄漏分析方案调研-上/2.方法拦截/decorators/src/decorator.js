
//装饰器
class TestObject{

    @cost
    sum(arr){
         return  arr.reduce((sum , cur)=>{
             return sum  + cur;
         },0)
     }
     
     @cost
     unique(key, ...arrs){
        const results = [];
        const keyMap = new Map();
 
        arrs.forEach(arr=>{
         arr.forEach( v=>{
             if(!keyMap.get(v[key])){
                 keyMap.set(v[key], 1);
                 results.push(v);
             }    
         });    
        })
        return results;
     }
 
     @cost
     random(min, max){
         return   min +  Math.random()*(max - min)
     }
 } 

 function cost(target, name, descriptor){
    // target.aaa = 1;
    // const t = target  

    const originValue = descriptor.value;

    console.log(target, name , descriptor);

    descriptor.value = function(){
        const startTime = Date.now();
        const result = originValue.apply(target, arguments);
        const endTime = Date.now();
        console.log(`cost: ${name}`, startTime, endTime, endTime - startTime);
        return result;
    }

    return descriptor
 }
 


const sumArr = Array.from({ length: 99999 }, (v, k) => {
    return k
});

const baseArr = Array.from({ length: 99999 }, (v, k) => {
    return {
        id: k
    }
});
const uniqueArr = [baseArr, [{
    id: 11
}, {
    id: 12
}], baseArr, [{
    id: -14
}], baseArr]


const testObject = new TestObject();

const result = testObject.random(10, 1000);
console.log("random:", result);
const sumValue = testObject.sum(sumArr);
console.log("sum:", sumValue);
const uniqueValue = testObject.unique("id", ...uniqueArr)
console.log("unique:", uniqueValue.length);
