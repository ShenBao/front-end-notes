const person = {
    _name: "Tom",
    get name2() {
        return this._name;
    },
    set name2(val) {
        this._name = val;
    }
}

const descriptor = Object.getOwnPropertyDescriptor(person, "name2");
console.log("get.name:", descriptor.get.name);
console.log("set.name:", descriptor.set.name);
