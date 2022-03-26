
var  name = "globalName";
function outer() {
    var outerName = "outerName";
    console.log(outerName);

    function inner() {
        var innerName = "innerName";
        console.log(innerName);
    }

    inner();
}


