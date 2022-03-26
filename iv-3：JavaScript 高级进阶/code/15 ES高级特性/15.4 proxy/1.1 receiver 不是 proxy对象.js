
const proto = {
  name: "parent"
};

let testObj;
const proxyProto = new Proxy(proto, {
  set(target, property, value, receiver) {
    console.log("触发set捕获器:");
    console.log("receiver === proxyProto:", receiver === proxyProto);
    console.log("receiver === testObj:", testObj === receiver);

    console.log("target:", target);
    console.log("property:", property);
    console.log("receiver:", receiver);
    return Reflect.set(target, property, value, receiver)
  }
});

function TestObject(message) {
  this.message = message;
}

TestObject.prototype = proxyProto;

testObj = new TestObject("message");
console.log();
console.log("准备设置message属性");
testObj.message = "message 啊";
console.log();
console.log("准备设置name属性");
testObj.name = "parent 啊"


