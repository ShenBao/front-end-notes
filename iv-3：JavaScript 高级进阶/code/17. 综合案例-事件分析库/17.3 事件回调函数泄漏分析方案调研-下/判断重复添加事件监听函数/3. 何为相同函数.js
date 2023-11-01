
var obj = {
    getName: function fn() {
        console.log("a");
    }
}

var obj2 = {
    getName: function fn() {
        console.log("a");
    }
}

console.log(obj.getName.toString() === obj2.getName.toString());