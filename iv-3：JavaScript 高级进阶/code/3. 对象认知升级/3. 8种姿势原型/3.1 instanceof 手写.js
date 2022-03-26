function instanceOf(instance, cclass) {
    let proto = instance.__proto__
    let prototype = cclass.prototype

    while (proto) {
        if (proto === prototype) return true
        proto = proto.__proto__
    }
    return false;
}

class Parent{}
class Child extends Parent{}
class CChild extends Child{}
class Luren{}
var cchild = new CChild();

console.log(instanceOf(cchild, Parent));
console.log(instanceOf(cchild, Child));
console.log(instanceOf(cchild, CChild));
console.log(instanceOf(cchild, Object));
console.log(instanceOf(cchild, Date));
console.log(instanceOf(cchild, Luren));