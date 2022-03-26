const arr = ["1"];

const proxy = new Proxy(arr, {});
const log = console.log;

log("isArray:", Array.isArray(proxy))


