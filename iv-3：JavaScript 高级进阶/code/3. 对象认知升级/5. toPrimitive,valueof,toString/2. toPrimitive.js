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

console.log(+obj);     // 10      -- hint 参数值是 "number"
console.log(`${obj}`); // "hello" -- hint 参数值是 "string"
console.log(obj + ""); // "true"  -- hint 参数值是 "default"