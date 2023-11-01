function a (){}
function A(){}

var log = console.log;

log(a.__proto__.__proto__ .__proto__);
log((new A()).__proto__.__proto__ .__proto__);