var obj = { name: "张三" };

function logName() {
    console.log(this.name, this)
}
var bindLogName = logName.bind(obj);

bindLogName();