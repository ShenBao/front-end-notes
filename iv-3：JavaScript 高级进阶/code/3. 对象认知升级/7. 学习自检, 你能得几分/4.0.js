
const proto = {
	name: "原型",
  arr: [1,2]
}
const person = Object.create(proto);
person.name = "实例";
person.arr.push(3);

console.log(person.name);
console.log(proto.name);

console.log(person.arr);
console.log(proto.arr);