
Array.isArray = function (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    return obj instanceof Array;
}


const arr = ["1"];
const proxy = new Proxy(arr, {});

const log = console.log;
log(Array.isArray(arr))
log(Array.isArray(proxy))


