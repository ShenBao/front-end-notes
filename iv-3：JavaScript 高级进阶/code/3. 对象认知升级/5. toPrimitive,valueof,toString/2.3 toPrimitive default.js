
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

console.log("相加:",5 + obj);
console.log("等等与:",5 == obj);
console.log("不等于:",5 != obj);
