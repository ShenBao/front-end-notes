function person(name, age, sex) {
    console.log("person arguments:", arguments);
    console.log("person type::", Object.prototype.toString.call(arguments));
}

person('name', 'age', 'sex');


//Dom 方法的返回结果
var domList = document.querySelectorAll(".s-center-box");
console.log("querySelectorAll type::", Object.prototype.toString.call(domList));


// 字符串

var str = "abc";
console.log(Array.from(str))
