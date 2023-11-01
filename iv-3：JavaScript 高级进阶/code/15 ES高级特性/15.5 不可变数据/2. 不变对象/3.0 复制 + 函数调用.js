
function produce(obj, recipe) {
  const newObj = { ...obj };
  recipe(newObj);
  return newObj;
}

const person = {
  name: "person",
  age: 21
};

const person1 = produce(person, draft => {
  draft.name = "person 1";
  draft.age = 10;
})

console.log("person:", person);
console.log("person1", person1);
console.log("person1 === person", person1 === person);
