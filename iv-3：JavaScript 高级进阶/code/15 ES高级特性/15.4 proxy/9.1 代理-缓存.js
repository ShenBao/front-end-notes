function sum(a, b) {
    return a + b;
}

function cacheProxy(fn) {
    var cache = Object.create(null);
    return function (...args) {
        const key = args.map(arg => JSON.stringify(arg)).join('__');
        if (cache[key] != null) {
            console.log("cached:", cache[key])
            return cache[key];
        }
        const result = fn.apply(null, args);
        cache[key] = result;
        console.log("no cache:", result);
        return result;
    }
}

const proxySum = cacheProxy(sum);
proxySum(3,5)
proxySum(3,5)