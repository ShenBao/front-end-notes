
//replacer 方法
var person = {
  name: "帅哥",
  age: 45,
  birth: '1990-01-01'
};

var jsonString = JSON.stringify(person, function (key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
});

console.log(jsonString);


var person = {
  name: "帅哥",
  age: 45,
  birth: '1990-01-01'
};

//replacer 数组
console.log(JSON.stringify(person, ['name', 'age']));


//space 美化格式
var person = {
  name: "帅哥",
  age: 45,
  birth: '1990-01-01'
};
const a = JSON.stringify(person);
console.log(a); 


var person = {
  name: "帅哥",
  age: 45,
  birth: '1990-01-01'
};
const c = JSON.stringify(person, null, '\t');
console.log(c);
