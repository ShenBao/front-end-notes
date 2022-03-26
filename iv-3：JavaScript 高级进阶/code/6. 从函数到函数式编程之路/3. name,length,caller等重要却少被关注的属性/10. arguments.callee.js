function sumTotal(n) {
    if (n == 1) return 1;
    return sumTotal(n - 1) + n;
};

console.log([5, 10, 20].map(sumTotal));

// [5, 10, 20].map(function (n) {
//     if (n == 1) return 1;
//     return /*这里写什么呢？没有方法名*/(n - 1) + n;
// })