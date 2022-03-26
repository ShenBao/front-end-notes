const person = {
    name: "tom",
    getName: function getNameMethod() {
        return this.name;
    }
}

console.log("person.getName.name:", person.getName.name);