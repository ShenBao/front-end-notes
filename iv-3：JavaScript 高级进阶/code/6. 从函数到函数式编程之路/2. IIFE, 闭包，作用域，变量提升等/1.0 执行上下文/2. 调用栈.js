
function outer(){
    var outerName  = "outerName";
    console.log(outerName);
    inner();
}

function inner(){
    var innerName  = "innerName";
    console.log(innerName);
}

outer()