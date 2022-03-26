var Person=function (name) {
    this.name=name;
}

var p1 = new Person("张三");

console.log(p1.name);

console.log(p1.hasOwnProperty("name"));