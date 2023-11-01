const obj1 = {
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

const obj2 = {
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

console.log("宽松比较: 对象和数字", obj1 == true);
console.log("宽松比较 两个对象:", obj1 == obj2);
console.log("严等:", obj1 === obj2);
console.log("不等:", obj1 != obj2);