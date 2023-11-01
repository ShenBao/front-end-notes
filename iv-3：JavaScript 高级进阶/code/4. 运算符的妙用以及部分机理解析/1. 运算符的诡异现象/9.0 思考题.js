var varNum = 10;
function evalCode(){
	eval(`var varNum = 20`)
}

function evalCode2(){
	(0,eval)(`var varNum = 30`)
}
console.log("varNum:", varNum);

evalCode()
console.log("varNum:", varNum);
evalCode2();
console.log("varNum:", varNum);