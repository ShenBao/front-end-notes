const symbolGetName = Symbol("getName");
const symbolGetName2 = Symbol("getName2");
const symbolGetName3 = Symbol("getName3");
const person = {
    name: "Tom",
    [symbolGetName]: function getNameMethod() {
        return this.name;
    },
    [symbolGetName2]() {
        return this.name;
    },
    [symbolGetName3]: function () {
        return this.name;
    },
}

console.log("symbolGetName.name:", person[symbolGetName].name);

console.log("symbolGetName2.name:", person[symbolGetName2].name);

console.log("symbolGetName3.name:", person[symbolGetName3].name);
