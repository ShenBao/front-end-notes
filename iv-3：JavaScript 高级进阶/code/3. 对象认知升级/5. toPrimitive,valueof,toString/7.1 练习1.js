const arr = [4,10];
arr[Symbol.toPrimitive] = function(hint){
	return hint;
}
arr.valueOf = function(){
	return this;
}

const obj = {};

 + arr + obj + arr + obj
{} + arr