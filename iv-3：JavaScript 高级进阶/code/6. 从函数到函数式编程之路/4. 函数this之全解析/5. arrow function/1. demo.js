var log = console.log

var name = "全局的name";
var getName = () => this.name;
log(getName());

var person = {
    name: "person的name",
    getName: () => this.name
}
log(person.getName());

var person2 = {
    name: "person2的name",
    getPerson() {
        return {
            getName: () => this.name
        }
    }
}
log(person2.getPerson().getName());