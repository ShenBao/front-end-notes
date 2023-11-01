var name = "哈士奇";
function getName(){
    console.log("this", global)
  	return this.name;
}
console.log("name",getName());

console.log("this", this)