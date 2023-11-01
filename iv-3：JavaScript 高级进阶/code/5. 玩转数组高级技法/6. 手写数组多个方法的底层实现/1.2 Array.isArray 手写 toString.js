
Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

const arr = ["1"];
const proxy = new Proxy(arr, {});

const log = console.log;
log(Array.isArray(arr))
log(Array.isArray(proxy))


