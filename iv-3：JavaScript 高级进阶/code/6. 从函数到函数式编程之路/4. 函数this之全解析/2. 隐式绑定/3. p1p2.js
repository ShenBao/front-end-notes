var name = "哈士奇";
function getName(){
    console.log("this:", this)
  	return this.name;
}
const person1 = {
	name: "person1的name",
  getName,
  person2: {
  	name: "person2的name",
    getName
  }
}

console.log(person1.getName());
console.log(person1.person2.getName());