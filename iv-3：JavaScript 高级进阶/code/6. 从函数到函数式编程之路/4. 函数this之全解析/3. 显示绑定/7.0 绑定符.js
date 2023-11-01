function logName() {
    console.log(this.name, this)
}

({name:"123"})::logName();

//等同于 logName.call({name:"123"})