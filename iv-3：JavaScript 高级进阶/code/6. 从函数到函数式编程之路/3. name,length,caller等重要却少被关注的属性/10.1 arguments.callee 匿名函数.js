const result=[5, 10, 20].map(function (n) {
    if (n == 1) return 1;
    return arguments.callee(n - 1) + n;
});

console.log("arguments.callee:",result);