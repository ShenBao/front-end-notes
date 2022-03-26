const user = {
    name: "John",
    age: 10,
    // toString() {
    //     // return this.name;
    //     return this;
    // },
    valueOf() {
        return this.age;
    }
};


Object.prototype.toString = undefined;

console.log("user:",  `${user}`);


