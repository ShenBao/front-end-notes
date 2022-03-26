class Grandpa {}
class Parent extends Grandpa{}
class Child extends Parent{};
var child = new Child()

var log = console.log;
//  2 + 3
log(child.__proto__.__proto__.__proto__.__proto__.__proto__)