
var AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

function createAsyncFun(...args) {
    return new AsyncFunction(...args);
}

var fn = createAsyncFun(`
    const res = await fetch("/");
    console.log("res:");
    return res.text();
`)

fn().then((res) => {
    console.log("res:", res);
}).catch((err) => {
    console.log("err:", err);
})


