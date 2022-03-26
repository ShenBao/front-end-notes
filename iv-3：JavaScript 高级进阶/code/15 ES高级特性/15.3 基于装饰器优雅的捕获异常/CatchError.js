const { DEFAULT_ERROR_CATCH_OPTIONS } = require("./Const");


class CatchError extends Error {
    __type__ = "__CATCH_ERROR__";
    /**
     * 捕捉到的错误
     * @param message 消息
     * @options 其他参数
     */
    constructor(message, options = DEFAULT_ERROR_CATCH_OPTIONS) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CatchError)
        }
        this.options = options;
    }
}

module.exports = {
    CatchError
};