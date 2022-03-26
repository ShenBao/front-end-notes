
const obj = {
    value: 10,
    toString: function () {
        return this.value + 10;
    },
    valueOf: function () {
        return this.value;
    }
};

obj[obj] = obj.value;

console.log("keys:", Object.keys(obj))
console.log("${obj}:", `${obj}`);
console.log("obj + 1:", (obj + 1));
console.log("obj + \"\":", (obj + ""));
