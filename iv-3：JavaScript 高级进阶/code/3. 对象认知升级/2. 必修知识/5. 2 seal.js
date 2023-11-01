
//2. Object.seal
const object1 = {
    property1: 42
};

Object.seal(object1);

// 不可以 添加属性
object1.property2 = 22;
console.log(object1.property2);

// 不可以 删除属性
delete object1.property1;
console.log(object1.property1);

