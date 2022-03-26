const pending = Symbol("pending");
const fulfilled = Symbol("fulfilled");
const rejected = Symbol("Rejected");

class MyPromise {
    constructor(callback) {
        //初始化状态
        this.PromiseStatus = pending;
        this.PromiseValue = null;
        //初始化集合
        this._initCollection();
        //绑定函数this指向
        this._initBind();
        //执行回调
        this._execute(callback);
    }

    _initCollection() {
        //初始化成功回调集合
        this.fulfilledCallbacks = [];
        //初始化失败回调集合
        this.rejectedCallbacks = [];
    }

    _initBind() {
        this.reject = this.reject.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    /**
     *
     * 捕获异常，调用reject
     * @param {any} callback
     *
     * @memberOf MyPromise
     */
    _execute(callback) {
        try {
            callback(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    /**
     *
     * 触发执行集合
     * @param {any} array
     *
     * @memberOf MyPromise
     */
    _triggerExecuteCollection(array) {
        while (array.length > 0) {
            array.shift()(this.PromiseValue);
        }
    }

    /**
     *
     * 改变Promise状态
     * @param {any} statusType 状态类型
     * @param {any} value   最终结果
     * @returns
     *
     * @memberOf MyPromise
     */
    _changePromiseStatus(statusType, value) {
        //改变状态
        this.PromiseStatus = statusType;

        this.PromiseValue = value;
    }

    /**
     *
     *
     * 失败
     * @memberOf MyPromise
     */
    reject(value) {
        //状态不可逆，必须从pending 改变
        if (this.PromiseStatus !== pending) return;
        setTimeout(() => {
            this._changePromiseStatus(rejected, value);
            this._triggerExecuteCollection(this.rejectedCallbacks);
        });
    }

    /**
     *
     *
     * 成功
     * @memberOf MyPromise
     */
    resolve(value) {
        if (this.PromiseStatus !== pending) return;
        setTimeout(() => {
            this._changePromiseStatus(fulfilled, value);
            this._triggerExecuteCollection(this.fulfilledCallbacks);
        });
    }

    then(onFulfilled, onRejected) {
        //不是函数,默认返回当前的值
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (err) => {
                      throw err;
                  };

        const nextPromise = new MyPromise((resolve, reject) => {
            //没有结果
            if (this.PromiseStatus === pending) {
                //添加成功回调，真正调用等成功 resolve 函数执行触发
                this.fulfilledCallbacks.push(() => {
                    try {
                        let result = onFulfilled(this.PromiseValue);
                        handlePromiseResult(result, nextPromise, resolve, reject);
                    } catch (e) {
                        //抛出一个错误
                        reject(e);
                    }
                });
                //添加失败回调，真正调用等拒绝 reject 函数执行触发
                this.rejectedCallbacks.push(() => {
                    try {
                        let result = onRejected(this.PromiseValue);
                        handlePromiseResult(result, nextPromise, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                return;
            }

            //有结果，立即执行
            if (this.PromiseStatus === fulfilled) {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.PromiseValue);
                        handlePromiseResult(result, nextPromise, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });

                return;
            }

            if (this.PromiseStatus === rejected) {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.PromiseValue);
                        handlePromiseResult(result, nextPromise, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });

        return nextPromise;
    }
}

/**
 *
 *
 * 处理运算结果
 * @memberOf MyPromise
 */
const handlePromiseResult = function (resultValue, thenPromise, resolve, reject) {
    //2.3.1 实现
    if (resultValue === thenPromise) {
        //不能将自身传入
        return reject(new TypeError("Chaining cycle detected for promise"));
    }
    //2.3.2 实现 返回类型为MyPromise
    if (resultValue instanceof MyPromise) {
        //2.3.2.1 实现
        if (resultValue.PromiseStatus === pending) {
            //FunResult的resolve,reject回调还没有执行，我们添加then等结果即可。
            //这里
            resultValue.then((result) => {
                //获取到resultValue的promise结果以后，再去判断结果是否为Promise.
                handlePromiseResult(result, thenPromise, resolve, reject);
            }, reject);
            return;
        }
        //2.3.2.2 实现
        if (resultValue.PromiseStatus === fulfilled) {
            resolve(resultValue.PromiseValue);
            return;
        }
        //2.3.2.3 实现
        if (resultValue.PromiseStatus === rejected) {
            reject(resultValue.PromiseValue);
            return;
        }
        return;
    }
    const resultValueType = typeof resultValue;
    //2.3.3 实现
    if (resultValue !== null && (resultValueType === "object" || resultValueType === "function")) {
        let then;
        //2.3.3.2 实现
        try {
            //2.3.3.1 实现
            then = resultValue.then;
        } catch (thenError) {
            return reject(thenError);
        }
        //2.3.3.3 实现
        if (typeof then == "function") {
            //2.3.3.3.4,try catch
            let called = false;
            try {
                then.call(
                    resultValue,
                    (y) => {
                        // 2.3.3.3.3
                        if (called) return;
                        called = true;
                        //2.3.3.1
                        handlePromiseResult(y, thenPromise, resolve, reject);
                    },
                    (r) => {
                        // 2.3.3.3.3
                        if (called) return;
                        called = true;
                        //2.3.3.2
                        reject(r);
                    }
                );
            } catch (callError) {
                //2.3.3.3.4.1 已经调用则略
                if (called) return;
                called = true;
                reject(callError);
            }
            return;
        }

        //2.3.3.4 不是一个方法
        resolve(resultValue);
        return;
    }

    //2.3.4 不是object,不是function
    return resolve(resultValue);
};

MyPromise.deferred = function () {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}

module.exports = MyPromise;
