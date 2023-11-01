const str = "aaaa";

try {
    JSON.parse(str);
} catch (e) {
    console.log("解析字符串错误");
} finally {
    console.log("finally处理");
}