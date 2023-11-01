
const person = {
    name: 'John',
    age: 21,
    sex: 'male'
}

function updateAge(person){
    person.age = 21
    person.name = null
}

updateAge(person);

console.log(person.name)




const test = { a: 1};
const bar = test;
bar.a = 2; // test.a 也变为 2