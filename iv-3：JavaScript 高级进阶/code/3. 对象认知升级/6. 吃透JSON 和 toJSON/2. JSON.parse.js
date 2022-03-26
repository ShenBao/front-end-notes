const jsonStr = `
	{ 
  	"name": "帅哥", 
  	"age":  18, 
    "isFans": true,
    "IDCard": "xxxxxxxxxxxxxxxxxx"
   }
`
// 保密身份证
var obj = JSON.parse(jsonStr, function (key, value) {
    if (key == "IDCard") {
        return undefined;
    } else {
        return value;
}});

console.log(obj);
