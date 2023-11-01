// 连续使用
function getPerson(){
	return this.person
}

function getName(){
  return this.name
}

var obj = {
	person: {
  	name: "Tom",
  }
}

obj::getPerson()::getName()