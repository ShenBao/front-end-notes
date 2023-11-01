function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (!obj) return obj;
    if (isPromise(obj)) return obj;

    // 简化
    return Promise.resolve(obj);

    // 额外处理了很多其他的数据类型
    // if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
    // if ('function' == typeof obj) return thunkToPromise.call(this, obj);
    // if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
    // if (isObject(obj)) return objectToPromise.call(this, obj);
    // return obj;
}


function co(gen) {
    var ctx = this;
    var args = Array.prototype.slice.call(arguments, 1)
    // we wrap everything in a promise to avoid promise chaining,
    // which leads to memory leak errors.
    // see https://github.com/tj/co/issues/180
    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function')
            gen = gen.apply(ctx, args);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        onFulfilled();
        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }
        function next(ret) {
            // 检查是否结束
            if (ret.done)
                return resolve(ret.value);

            // 转为Promise
            var value = toPromise.call(ctx, ret.value);
            // 检查是不是Promise
            if (value && isPromise(value))
                return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
    });
}

function getData(duration, data) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(data * 2)
        }, duration)
    })
}


var gen = function* () {
    const start = Date.now();
    var num1 = yield getData(1000, 10);
    var num2 = yield getData(2000, 20);
    console.log("result:", num1 + num2, ", cost:" , Date.now() - start);
};

co(gen)