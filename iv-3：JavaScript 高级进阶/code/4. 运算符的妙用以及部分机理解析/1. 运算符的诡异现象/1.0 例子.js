let name = "let的name";
const person = {
  name: "person的Name",
  getName() {
    return this.name;
  },
};

const getName = person.getName;

const print = function (prefix, ...args) {
  console.log(prefix.padEnd(20, " ") + ":", ...args);
};

print("getName", getName());

print("person.getName", person.getName());
print("(person.getName)", (person.getName)());
print("(0, person.getName)", (0, person.getName)());
