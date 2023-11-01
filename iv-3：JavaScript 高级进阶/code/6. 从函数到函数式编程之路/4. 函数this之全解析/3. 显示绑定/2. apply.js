var obj = { name: "张三" };

function logName() {
    console.log(this.name, this)
}
logName.apply(obj);