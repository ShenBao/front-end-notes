
function updateProperty(obj, key, value) {
  const newObj = {
    ...obj,
    [key]: value
  }
  return newObj
}

var person = {
  name: "person",
  age: 18
};

const person1 = updateProperty(person, "name", "person 1");

console.log("person1.name:", person1.name);
console.log("person === person1", person === person1);

