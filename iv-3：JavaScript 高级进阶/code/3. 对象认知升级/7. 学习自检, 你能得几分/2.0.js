const person = {
    name: '二哈'
}
const person2 = Object.create(person);
delete person2.name

console.log(person2.name);