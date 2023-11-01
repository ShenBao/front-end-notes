"use strict"
var name = "哈士奇";
function getName(){
    console.log("this:", this === global, this)
  	return this.name;
}

console.log("this:", this)
console.log("name:",getName());
