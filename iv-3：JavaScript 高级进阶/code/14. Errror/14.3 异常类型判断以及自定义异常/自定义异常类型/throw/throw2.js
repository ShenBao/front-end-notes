

function throwError(a){
    if(a>10){
        throw new RangeError("值超出限制");
    }
}

try{
    throwError(15);
}catch(e){
    console.log(e.name,"==e.message==",e.message);
}