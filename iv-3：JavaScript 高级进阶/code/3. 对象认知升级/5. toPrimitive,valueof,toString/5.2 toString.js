const user = {
    name: "John",
    age: 10,
    toString() {
        return this.name;
    },
    // valueOf() {
    //     // return this.age;
    //     return this;
    // }
};

console.log("user:",  + user);
