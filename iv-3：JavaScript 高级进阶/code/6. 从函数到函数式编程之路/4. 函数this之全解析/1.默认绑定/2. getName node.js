var name = "哈士奇";
function getName(){
    console.log("this:", this === global,  this)
  	return this.name;
}
console.log("name:",getName());

console.log("this:", this)