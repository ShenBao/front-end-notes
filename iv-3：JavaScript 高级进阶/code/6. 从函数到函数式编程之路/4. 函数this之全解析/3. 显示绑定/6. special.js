
// 浏览器中执行

var name = "全局的name";
function getName(){
  return this.name
}

const log = console.log;
log(getName.call(null));
log(getName.call(undefined));

log(getName.call({name: "name"}));