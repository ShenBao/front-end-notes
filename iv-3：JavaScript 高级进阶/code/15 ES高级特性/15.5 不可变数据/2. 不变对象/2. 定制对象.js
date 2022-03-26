class MyObject {
  constructor(obj = {}) {
    this.obj = { ...obj }
  }

  get(name) {
    return this.obj[name]
  }

  set(name, value) {
    return new MyObject({
      ...this.obj,
      [name]: value
    })
  }
}

var person = new MyObject({
  name: "person",
  age: 18
});

const person1 = person.set("name", "person 1")

console.log("person1.name:", person1.get("name"));
console.log("person === person1", person === person1);

