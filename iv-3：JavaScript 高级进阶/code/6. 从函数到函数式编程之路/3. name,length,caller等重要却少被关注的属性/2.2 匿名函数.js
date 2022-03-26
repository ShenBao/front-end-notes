const person = {
    name: "Tom",
    getName: function () {
        return this.name;
    }
};


console.log("name:", person.getName.name);
