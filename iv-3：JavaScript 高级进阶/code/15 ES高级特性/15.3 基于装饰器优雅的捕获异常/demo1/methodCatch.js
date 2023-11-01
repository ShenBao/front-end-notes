const { DEFAULT_ERROR_CATCH_OPTIONS } = require("../Const");

const W_TYPES = ["string", "object"];

function methodCatch(options) {
    const type = typeof options;
    let opt;
    if (options == null || !W_TYPES.includes(type)) { // null 或者 不是字符串或者对象
        opt = DEFAULT_ERROR_CATCH_OPTIONS;
    } else if (typeof options === "string") {  // 字符串
        opt = {
            ...DEFAULT_ERROR_CATCH_OPTIONS,
            message: options || DEFAULT_ERROR_CATCH_OPTIONS.message,
        }
    } else { // 有效的对象
        opt = { ...DEFAULT_ERROR_CATCH_OPTIONS, ...options }
    }

    return function (_target, _name, descriptor) {

        // 保存旧的方法
        const oldFn = descriptor.value;
        // 重写旧的方法，
        // 调用自定义的方法，自定义的方法内部再去调用旧的方法
        // descriptor.value = function(){}
        Object.defineProperty(descriptor, "value", {
            get() {
                async function proxy(...args) {
                    try {
                        const res = await oldFn.apply(this, args);
                        return res;
                    } catch (err) {
                        if (err.__type__ == "__CATCH_ERROR__") {
                            console.log(opt, err.options);
                            const mOpt = { ...opt, ...(err.options || {}) };
                            const message = err.message || mOpt.message ;
                            if (mOpt.log) {
                                console.error("asyncMethodCatch:", message, err);
                            }
                            if (mOpt.report) {
                                console.info("report:", message);
                            }

                            if (mOpt.toast) {
                                console.info("toast:", message);
                            }
                        } else {
                            const message = opt.message || err.message;
                            console.error("asyncMethodCatch:", message, err);

                            if (opt.toast) {
                                console.info("toast 输出:", message);
                            }
                        }
                    }
                }
                proxy._bound = true;
                return proxy;
            }
        })
        return descriptor;
    }
}


module.exports = {
    methodCatch
};