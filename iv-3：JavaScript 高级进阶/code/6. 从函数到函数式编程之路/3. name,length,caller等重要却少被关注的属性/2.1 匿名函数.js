const person = {
    name: "Tom"
};

person.getName = function () {
    return this.name
}

console.log("name:", person.getName.name);
