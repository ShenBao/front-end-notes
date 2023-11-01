// 浏览器中执行
var name = "global.name";
var person = {
  name: "person.name",
  getName() {
    return () => this.name;
  }
}

var log = console.log;

log(person.getName()());

log(person.getName.call({ name: "name" })())