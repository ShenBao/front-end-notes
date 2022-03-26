var arr = [1, 2, 3];

const log = console.log;

// 纯
log(arr.slice(0), arr);
log(arr.slice(0), arr);

// 不纯
log(arr.splice(0), arr);
log(arr.splice(0), arr)