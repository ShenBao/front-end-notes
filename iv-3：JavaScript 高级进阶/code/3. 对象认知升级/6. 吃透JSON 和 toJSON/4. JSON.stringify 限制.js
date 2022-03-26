// 自动忽略
const data = {
    a: "test1",
    b: undefined,
    c: Symbol("test2"),
    fn: function () {
        return true;
    }
};
console.log(JSON.stringify(data));

//数组返回null
const data = ["test1", undefined, function aa() {
    return true
}, Symbol('test2')];
console.log(JSON.stringify(data));

//返回undefined
const a1 = JSON.stringify(function a() { console.log('test1') })
console.log("a1==", a1);
const a2 = JSON.stringify(undefined);
console.log("a2==", a2);
const a3 = JSON.stringify(Symbol('test2'))
console.log("a3==", a3)

//Date
console.log(JSON.stringify({ now: new Date() }));

// NaN 和 Infinity 以及null
console.log(JSON.stringify(NaN));
console.log(JSON.stringify(Infinity));
console.log(JSON.stringify(null));

//转换为对应的原始值。
console.log(JSON.stringify([new Number(2), new String("test"), new Boolean(false)]));

//仅序列化可枚举属性
const a = JSON.stringify(
    Object.create(
        null,
        {
            test1: { value: 'testa', enumerable: false },
            test2: { value: 'testb', enumerable: true }
        }
    )
);
console.log(a);



//循环引用报错
const obj = {
    name: "loopObj"
};
const loopObj = {
    obj
};
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj;

// 封装一个深拷贝的函数
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
// 执行深拷贝，抛出错误
deepClone(obj)

// BigInt 报错
var c = {
    test: 1n
}
console.log(JSON.stringify(c));