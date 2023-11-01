"use strict";
var __awaiter = function (thisArg, _arguments, P, generator) {
    // 如果值是Promise, 直接返回，如果不是包裹成为Promise
    // 例如 await 1 => await Promise.resolve(1)
    function adopt(value) {
        return value instanceof Promise ? value :
            new Promise(function (resolve) { resolve(value); });
        // 可以使用 Promise.resolve(value)代替
        // Promise.resolve(value)
    }

    // 创建Promise
    return new Promise(function (resolve, reject) {
        // 成功执行
        function fulfilled(value) {
            try {
                // 取下一个
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }

        // 发生错误
        function rejected(value) {
            try {
                // 抛出异常
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        // 执行控制器
        function step(result) {
            // 执行完毕，直接调用resolve, 返回结果
            result.done ? resolve(result.value) :
                // 继续执行， 并传递上一次的执行结果
                adopt(result.value)
                    .then(fulfilled, rejected);
        }

        // 产生generator， bind定this
        generator = generator.apply(thisArg, _arguments || []);
        // 开始执行
        step(generator.next());
    });
};

function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const r1 = yield 1;
        const r2 = yield 2;
        console.log("result:", r1 + r2);
    });
}
test();
