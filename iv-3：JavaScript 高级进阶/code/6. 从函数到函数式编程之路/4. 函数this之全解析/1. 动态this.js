// 浏览器中执行
var name = "window";

function logName(){
    console.log(this.name, this)
}

function logName2(){
    "use strict"
     console.log("this:", this)
}

var person = {
    name: "person",
    logName
}

logName();

logName2()

person.logName();

