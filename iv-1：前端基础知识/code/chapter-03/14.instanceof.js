function Persion() {
  this.name = "freemen";
}

const obj = new Persion();

// console.log(obj instanceof Persion)

// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
function instance_of(Obj, Constructor) {
  let implicitPrototype = Obj.__proto__; // 获取实例对象的隐式原型
  let displayPrototype = Constructor.prototype; // 获取构造函数的prototype 属性
  // while 循环 -> 在原型链上不断向上查找
  while (true) {
    // 直到 implicitPrototype = null 都没找到, 返回false
    if (implicitPrototype === null) {
      return false;
      // 构造函数的 prototype 属性出现在实例对象的原型链上 返回 true
    } else if (implicitPrototype === displayPrototype) {
      return true;
    }
    // 在原型链上不断查找 构造函数的显式原型
    implicitPrototype = implicitPrototype.__proto__;
  }
}

const has = instance_of(obj, Persion);

console.log(`has`, has);
