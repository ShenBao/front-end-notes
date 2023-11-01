
// instanceOf 性能
// var count = 10000000;
// var func = function () { };

// var startTime = new Date();
// console.log(typeof func === "function");
// for (var j = 0; j < count; j++) {
//     typeof func === "function";
// }
// console.log('[typeof func === "function"] ' + (new Date().getTime() - startTime.getTime()));
// startTime = new Date();


// console.log(func instanceof Function);
// for (var k = 0; k < count; k++) {
//     func instanceof Function;
// }
// console.log('[func instanceof Function] ' + (new Date().getTime() - startTime.getTime()));




// 判断Number
// function isNumber(obj) {
//     if (typeof obj === 'number') {
//         return true;
//     }
//     return false;
// }



// null和undefined
var print = console.log;
print(Object.getOwnPropertyDescriptor(global, 'null'))
print(Object.getOwnPropertyDescriptor(global, 'undefined'))
