(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AsyncMessager = {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const { hasOwnProperty: hasOwn } = Object.prototype;
    /* eslint-disable no-bitwise */
    /* eslint-disable no-shadow */
    function hashcode(str = "") {
        let hash = 0;
        let i;
        let chr;
        let len;
        if (str.length === 0)
            return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    function isFunction(fn) {
        return typeof fn === 'function';
    }
    const noop = function noop() { };
    /**
     * 延时执行函数
     * @param fn
     * @param delay
     * @param context
     * @returns
     */
    function delay(fn = () => { }, delay = 5000, context = null) {
        if (!isFunction(fn)) {
            return {
                run: () => Promise.resolve(),
                cancel: noop
            };
        }
        let ticket;
        let runned = false;
        return {
            run(...args) {
                return new Promise((resolve, reject) => {
                    if (runned === true) {
                        return;
                    }
                    runned = true;
                    ticket = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const res = yield fn.apply(context, args);
                            resolve(res);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }), delay);
                });
            },
            cancel: () => {
                clearTimeout(ticket);
            }
        };
    }
    function hasOwnProperty(obj, property) {
        return hasOwn.call(obj, property);
    }

    /* eslint-disable @typescript-eslint/interface-name-prefix */
    class PEventMessager {
        constructor() {
            this._map = new Map();
            /**
             * 可以处理多种类型的事件
             * @param category
             * @returns
             */
            this.addHandler = (category, listener, context = null) => {
                const cates = Array.isArray(category) ? category : [category];
                const map = this._map;
                if (typeof listener !== "function") {
                    return console.error(`PassiveEventMessager::addHandler: fn 必须是一个函数`);
                }
                cates.forEach(cate => {
                    let handlers = map.get(cate);
                    if (handlers == undefined) {
                        handlers = [];
                        map.set(cate, handlers);
                    }
                    handlers.push({
                        methodName: listener.name || "anonymous",
                        target: context,
                        listener
                    });
                });
            };
            this.removeHandler = (category, listener) => {
                console.log("removeHander:", category);
                const cates = Array.isArray(category) ? category : [category];
                const map = this._map;
                if (typeof listener !== "function") {
                    return console.error(`PassiveEventMessager::removeHandler: fn 必须是一个函数`);
                }
                let cate;
                for (let i = 0; i < cates.length; i++) {
                    cate = cates[i];
                    const handlers = map.get(cate);
                    if (handlers == undefined || !Array.isArray(handlers)) {
                        continue;
                    }
                    let index;
                    for (let i = handlers.length; i >= 0; i--) {
                        index = handlers.findIndex(h => h.listener === listener);
                        if (index >= 0) {
                            handlers.splice(index, 1);
                            break;
                        }
                    }
                    // handlers 长度为0，删除分类
                    if (handlers.length == 0) {
                        map.delete(cate);
                    }
                }
            };
            this.emit = (category, data, ...args) => {
                // console.log("PassiveEventMessager::onMessage", category, data);
                const handlers = this._map.get(category);
                if (handlers == undefined) {
                    return;
                }
                // console.log("handlers", handlers.length, handlers);
                handlers.forEach(handler => {
                    const { listener: fun } = handler;
                    if (!fun) {
                        console.error(`PassiveEventMessager:不能找到category为${category}对应的${handler.methodName}事件处理函数`);
                    }
                    else {
                        fun.apply(handler.target, [data].concat(args));
                    }
                });
            };
        }
        has(category) {
            const handlers = this._map.get(category);
            return !!handlers && handlers.length > 0;
        }
    }

    const DEFAULT_G_OPTIONS = {
        timeout: 5000,
        clearTimeoutReq: true,
        // autoSubscribe: false,
        enableLog: true,
        logUnhandledEvent: true,
    };
    class BaseAsyncMessager {
        constructor(options = DEFAULT_G_OPTIONS, passiveEventMessager = new PEventMessager()) {
            this.passiveEventMessager = passiveEventMessager;
            this.useOptions = false;
            /**
             * 请求的次数
             */
            this._reqCount = 0;
            /**
             * 响应的次数
             */
            this._resCount = 0;
            /**
             * 超时的数量
             */
            this._timeOutCount = 0;
            this.cbMap = new Map();
            this.getMethod = (name) => {
                const optMethod = this._options[name];
                const classMethod = this[name];
                const method = this.useOptions ? optMethod || classMethod : classMethod || optMethod;
                if (!method) {
                    console.error(`${method} 查找失败，请确保在Class或者options上已定义`);
                }
                return method;
            };
            this.onMessage = (data) => {
                // console.log("BaseAsyncMessager::onMessage:", data);
                const category = this.getMethod("getResCategory")(data);
                const key = this.getMethod("getResKey")(data);
                const scope = this.getMethod("getResScope")(data);
                // 提供自定义助力数据的能力
                data = this.getMethod("onResponse")(category, data);
                const isInHanlders = this.passiveEventMessager.has(category);
                // 内置的成功处理
                this.onBuiltInResponse(category, data);
                const callback = this.getCallback(category, scope, key);
                //  AsyncMessager中没有，PEventMessager中也没有, 并且开启相关的日志输出
                if (!callback && !isInHanlders && this._options.logUnhandledEvent) {
                    this.onError();
                    console.warn(`未找到category为${category},key为${key}的回调信息`);
                    return;
                }
                this.onSuccess(category, data);
                if (callback) {
                    callback(data);
                }
            };
            this.onTimeout = () => {
                this._timeOutCount++;
            };
            this.onError = () => {
            };
            this.onSuccess = (category, data) => {
                this._resCount++;
            };
            this._options = Object.assign(Object.assign({}, DEFAULT_G_OPTIONS), options);
            if (isFunction(this._options.subscribe)) {
                // 订阅
                this.unsubscribe = this._options.subscribe(this.onMessage);
            }
            this.useOptions = true;
        }
        subscribe(onMessage) {
            throw new Error("not implemented");
        }
        getReqkey(data) {
            const method = this.getMethod("getHashCode");
            return method(data);
        }
        getReqCategory(data) {
            // throw new Error("not implemented")
            const d = data;
            return d.method || d.type;
        }
        getResCategory(data) {
            // throw new Error("not implemented")
            const d = data;
            return d.method || d.type;
        }
        request(data, key) {
            throw new Error("not implemented");
        }
        getResKey(data) {
            return data._key_;
        }
        getResScope(data) {
            return data.scope;
        }
        /**
         * 计算hashCode
         * @param data
         * @returns
         */
        getHashCode(data) {
            return hashcode(JSON.stringify(data));
        }
        onResponse(_category, data) {
            return data;
        }
        addCallback(category, reqInfo) {
            const cbs = this.cbMap.get(category);
            if (!cbs) {
                this.cbMap.set(category, []);
            }
            this.cbMap.get(category).push({
                key: reqInfo.key,
                reqTime: Date.now(),
                cb: reqInfo.cb
            });
        }
        getCallback(category, scope, key) {
            const cbs = this.cbMap.get(category);
            if (!cbs) {
                return undefined;
            }
            if (typeof key === "string") {
                const reqInfo = this.removeReqInfo(category, scope, key);
                if (!reqInfo) {
                    return undefined;
                }
                return reqInfo.cb;
            }
            // TODO:: scope
            if (!cbs || cbs.length == 0) {
                return undefined;
            }
            // 返回第一个
            return cbs.shift().cb;
        }
        invoke(data, reqOptions) {
            this._reqCount++;
            const { timeout = 5000, defaultRes = {
                message: "请求超时"
            } } = reqOptions || {};
            // 获得key值
            if (!hasOwnProperty(data, "_key_")) {
                data._key_ = this.getMethod("getReqkey").apply(this, [data]);
            }
            const hashKey = data._key_;
            const tout = timeout || this._options.timeout;
            const category = this.getMethod("getReqCategory")(data);
            return new Promise((resolve, reject) => {
                const { run, cancel } = delay(undefined, tout);
                // 超时
                run().then(() => {
                    console.log("请求超时:", category, data, hashKey);
                    this.onTimeout();
                    if (this._options.clearTimeoutReq) {
                        this.removeReqInfo(category, data === null || data === void 0 ? void 0 : data.scope, hashKey);
                    }
                    reject(Object.assign({ message: "请求超时" }, (defaultRes || {})));
                });
                this.addCallback(category, {
                    key: hashKey,
                    cb: (msg) => {
                        // 取消超时回调
                        cancel();
                        resolve(msg);
                    }
                });
                // 调用
                this.getMethod("request")(data, hashKey);
            });
        }
        removeReqInfo(category, scope, key) {
            const cbs = this.cbMap.get(category);
            if (!cbs) {
                return undefined;
            }
            const index = cbs.findIndex(c => { var _a; return c.key === key && ((_a = c === null || c === void 0 ? void 0 : c.reqData) === null || _a === void 0 ? void 0 : _a.scope) == scope; });
            if (index < 0) {
                return undefined;
            }
            const reqInfo = cbs[index];
            cbs.splice(index, 1);
            return reqInfo;
        }
        onBuiltInResponse(category, data) {
            if (this.passiveEventMessager) {
                this.passiveEventMessager.emit(category, data);
            }
            return data;
        }
        getStatistics() {
            return {
                total: this._reqCount,
                success: this._resCount,
                timeout: this._timeOutCount
            };
        }
        get addHandler() {
            return this.passiveEventMessager.addHandler || noop;
        }
        get removeHandler() {
            return this.passiveEventMessager.removeHandler || noop;
        }
        destroy() {
            if (this.unsubscribe) {
                this.unsubscribe();
                this.cbMap.clear();
                // this.cbMap = null;
            }
        }
    }

    exports.BaseAsyncMessager = BaseAsyncMessager;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
