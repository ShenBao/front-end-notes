var name = "window";
var obj = { name: "张三" };

function logName() {
    console.log(this.name)
}

function logName2() {
    "use strict"
    console.log(this.name)
}

var person = {
    name: "person",
    logName,
    logName2: () => logName()
}

logName();
person.logName();
person.logName2();
logName.bind(obj)();
logName2()

