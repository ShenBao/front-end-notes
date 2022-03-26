function getName(){
	return this.name;
}

var obj = {
	name: 'name'
}

getName.call(obj);

// 等同于
obj.getName = getName;
obj.getName();