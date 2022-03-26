// 浏览器
var name = "window";
var obj = { name: "张三" };

function logName() {
    console.log(this.name)
}

var person = { name: "person", logName };

// 升级版本
(person.logName)();
(1, person.logName)()
(false || person.logName)() 