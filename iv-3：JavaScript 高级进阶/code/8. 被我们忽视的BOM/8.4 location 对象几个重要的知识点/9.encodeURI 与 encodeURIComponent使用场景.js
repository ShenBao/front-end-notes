
console.log("-----encodeURI使用场景------")

const test1 = "https://www.baidu.com/index.html?wd=慕课网";

console.log("encodeURI:", encodeURI(test1));

console.log("encodeURIComponent:", encodeURIComponent(test1));

console.log("-----encodeURIComponent使用场景------")


// https://www.baidu.com/index.html?go=https://www.imooc.com/
const test2 = "https://www.baidu.com/index.html?go=";

console.log("encodeURIComponent:", test2 + encodeURIComponent("https://www.imooc.com/"));
