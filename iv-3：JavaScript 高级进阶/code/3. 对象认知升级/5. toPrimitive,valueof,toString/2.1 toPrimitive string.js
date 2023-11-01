
const obj = {
    [Symbol.toPrimitive](hint) {
        if (hint == "number") {
            return 10;
        }
        if (hint == "string") {
            return "hello";
        }
        return true;
    }
};
// alert, 浏览器
// window.alert(obj);
// ${}
console.log(`${obj}`);
// 属性键
obj[obj] = 123;
console.log(Object.keys(obj));
