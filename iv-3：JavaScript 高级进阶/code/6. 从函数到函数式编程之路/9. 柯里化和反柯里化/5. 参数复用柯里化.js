var slice = Array.prototype.slice;
var curry = function (fn, length) {
    var args = slice.call(arguments, 2)
    return _curry.apply(this, [fn, length || fn.length].concat(args))
};

function _curry(fn, len) {
    var oArgs = slice.call(arguments, 2);
    return function () {
        var args = oArgs.concat(slice.call(arguments));
        if (args.length >= len) {
            return fn.apply(this, args);
        } else {
            return _curry.apply(this, [fn, len].concat(args))
        }
    }
}


function log(logLevel, msg) {
    console.log(`${logLevel}:${msg}:::${Date.now()}`)
}

//柯里化log 方法
const curryLog = curry(log);

const debugLog = curryLog("debug");

const errLog = curryLog("error");

//复用参数debug
debugLog("testDebug1");
debugLog("testDebug2");

//复用参数error
errLog("testError1");
errLog("testError2");