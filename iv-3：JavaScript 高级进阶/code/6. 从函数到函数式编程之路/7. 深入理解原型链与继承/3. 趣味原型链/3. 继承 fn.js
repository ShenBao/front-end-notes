function Grandpa(){}

function Parent(){}
Parent.prototype = new Grandpa();

function Child(){}
Child.prototype = new Parent()

var child = new Child()

var log = console.log;
//  2 + 3
log(child.__proto__.__proto__.__proto__.__proto__.__proto__)