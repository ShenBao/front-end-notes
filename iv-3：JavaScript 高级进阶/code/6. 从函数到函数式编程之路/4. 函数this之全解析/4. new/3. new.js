const slice = Array.prototype.slice;
function newObject(constructor) {
    var args = slice.call(arguments, 1);
    var obj = {};  // 1
    obj.__proto__ = constructor.prototype  // 2
    var res = constructor.apply(obj, args);  //3
    return res instanceof Object ? res : obj; //4
}


function Person(name){
    this.name = name;
}

function Person2(name){
    this.name = name;
    return {
        name: "超级帅哥"
    }
}

var person = newObject(Person, "帅哥");
var person2 = newObject(Person2, "帅哥");
console.log(person.name);
console.log(person2.name);