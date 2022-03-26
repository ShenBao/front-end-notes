const person = {
    name: "帅哥",
    age: 18,
    getName: function () {
        return this.name;
    },
    address: {
        province: "北京"
    }
}

const hasOwn = Object.prototype.hasOwnProperty;
function clone(obj) {
    const result = {};
    for (let p in obj) {
        if(hasOwn.call(obj, p)){
            result[p] = obj[p];
        }
    }
    return result;
}
var person2 = clone(person);

person2.name = "帅哥2";
person2.getName = function(){
    return  `person2` +  this.name;
}
person2.address.province = "上海"

console.log("person.name:", person.name);
console.log("person.getName:", person.getName.toString());
console.log("person.address.province:", person.address.province);