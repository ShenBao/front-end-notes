var name = "哈士奇";
function getName(){
    console.log("this:", this)
  	return this.name;
}

var person = {
	name: "person的name",
  getName
};

console.log("name:", person.getName());