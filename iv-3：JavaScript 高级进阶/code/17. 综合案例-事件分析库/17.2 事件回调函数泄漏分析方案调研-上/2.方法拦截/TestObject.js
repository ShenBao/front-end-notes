
module.exports = class TestObject{

   sum(arr){
        return  arr.reduce((sum , cur)=>{
            return sum  + cur;
        },0)
    }

    unique(key, ...arrs){
       const results = [];
       const keyMap = new Map();

       arrs.forEach(arr=>{
        arr.forEach(v=>{
            if(!keyMap.get(v[key])){
                keyMap.set(v[key], 1);
                results.push(v);
            }    
        });    
       })
       return results;
    }

    random(min, max){
        return   min +  Math.random()*(max - min)
    }
}