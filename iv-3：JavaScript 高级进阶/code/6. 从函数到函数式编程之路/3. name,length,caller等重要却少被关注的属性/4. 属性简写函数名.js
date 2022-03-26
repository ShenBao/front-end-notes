const person = {
    name: "Tom",
    getName() {
        return this.name;
    }
}
console.log("person.getName.name:", person.getName.name);