function getName(obj) {
    obj.age = 10;
    return obj.name
}

var obj = {
    name: "obj的name",
    age: 20
}

var log = console.log
log("age:", obj.age);
getName(obj)
log("age:", obj.age);