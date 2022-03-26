

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

const a = clone({ a: 1, c: { b: 2 } }); // {a:1,c:{b:2}}
console.log("common object:",a);

// 时间：转为字符串
console.log("date:", clone({ date: new Date() })); // {date: '2021-09-26T08:23:40.517Z'}

// 正则： 变为了空对象  异常
console.log("regex", clone({ regex: /[0-9]/ })); // {regex: {…}}
// Blob: 变为空对象， 异常
console.log("blob:", clone({ blob: new Blob(["123"]) })); // {blob: {…}}

// 函数
console.log("function:", clone({ fn() { } }));  // {}
// window
console.log(clone(window)) // Uncaught TypeError: Converting circular structure to JSON