var results = ["1", "2", "3"].map(parseInt);
console.log(results);





["1", "2", "3"].map((val,index)=> parseInt(val,index))
// parseInt("1",0)
// parseInt("2",1)
// parseInt("3",2)