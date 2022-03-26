
const print = console.log
function Person(){}
var person = new Person()
print(person.__proto__ === person.constructor.prototype)