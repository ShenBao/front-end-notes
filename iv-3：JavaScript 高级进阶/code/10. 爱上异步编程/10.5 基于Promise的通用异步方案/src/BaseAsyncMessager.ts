import * as util from "./util";
import PEventMessager, { IPEventMessager } from "./PEventMessager";
import { BaseReqData, BaseResData, GlobalReqOptions, MessageType, ReqInfo, ReqOptions, Unsubscribe } from "./types";
import { isSameScope } from "./util";

const DEFAULT_G_OPTIONS: GlobalReqOptions = {
    timeout: 5000,
    clearTimeoutReq: true,
    // autoSubscribe: false,
    enableLog: true,
    logUnhandledEvent: true,
};

type extensibleMethod = "subscribe" | "getReqkey" | "getReqCategory" | "getResKey" | "getResCategory" | "request" | "getResScope" | "onResponse" | "getHashCode";

export default class BaseAsyncMessager<R = any, S = any> {

    private useOptions: boolean = false;
    /**
     * 请求的次数
     */
    private _reqCount = 0;
    /**
     * 响应的次数
     */
    private _resCount = 0;
    /**
     * 超时的数量
     */
    private _timeOutCount = 0;

    private _options: GlobalReqOptions;

    private cbMap = new Map<MessageType, ReqInfo<R>[]>();

    protected unsubscribe?: Unsubscribe;

    constructor(options: GlobalReqOptions = DEFAULT_G_OPTIONS,
        private passiveEventMessager: IPEventMessager = new PEventMessager()) {
        this._options = { ...DEFAULT_G_OPTIONS, ...options };

        if (util.isFunction(this._options.subscribe)) {
            this.unsubscribe = this._options.subscribe!(this.onMessage)
        }
        this.useOptions = true;
    }

    subscribe(onMessage?: Function): Unsubscribe {
        throw new Error("not implemented")
    }

    protected request(_data: BaseReqData<R>, _key: string): any {
        throw new Error("not implemented")
    }

    protected getReqkey<R>(data: BaseReqData<R>) {
        const method = this.getMethod("getHashCode");
        return method!(data);
    }

    protected getReqCategory(data: BaseReqData<R>): MessageType {
        return data.method || data.type;
    }

    protected getResCategory(data: BaseResData<S>): MessageType {
        return data.method || data.type;
    }

    protected getResKey(data: BaseResData<S>): MessageType {
        return data._key_!;
    }

    protected getResScope(data: BaseResData<S>) {
        return data.scope;
    }

    /**
     * 计算hashCode
     * @param data 
     * @returns 
     */
    protected getHashCode(data: BaseReqData<R>) {
        return util.hashcode(JSON.stringify(data))
    }

    protected onResponse(_category: MessageType, data: BaseResData<S>) {
        return data;
    }

    private getMethod = (name: extensibleMethod) => {
        const optMethod = this._options[name as keyof GlobalReqOptions];
        const classMethod = this[name as keyof this];

        const method = this.useOptions ? optMethod || classMethod : classMethod || optMethod;
        if (!method) {
            console.error(`${method} 查找失败,请确保在Class或者options上已定义`);
        }
        return method as Function;
    }

    protected onMessage = (data: BaseResData<S>) => {
        const category = this.getMethod("getResCategory")(data);
        const key = this.getMethod("getResKey")(data);

        const scope = this.getMethod("getResScope")(data);
        // 提供自定义助力数据的能力
        data = this.getMethod("onResponse")(category, data);

        const isInHandlers = this.passiveEventMessager.has(category);
        // 内置的成功处理
        this.onBuiltInResponse(category, data);

        const callback = this.getCallback(category, scope, key);

        //  AsyncMessager中没有，PEventMessager中也没有, 并且开启相关的日志输出
        if (!callback && !isInHandlers && this._options.logUnhandledEvent) {
            this.onError();
            console.warn(`未找到category为${category},key为${key}的回调信息`);
            return;
        }
        this.onSuccess(category, data);
        if (callback) {
            callback(data);
        }
    }

    private addCallback(category: MessageType, reqInfo: ReqInfo) {
        const cbs = this.cbMap.get(category);
        if (!cbs) {
            this.cbMap.set(category, []);
        }

        this.cbMap.get(category)!.push({
            key: reqInfo.key,
            reqTime: Date.now(),
            cb: reqInfo.cb,
            scope: reqInfo.scope
        });
    }

    private getCallback(category: MessageType, scope: string, key: string) {
        const reqInfo = this.removeReqInfo(category, scope, key);
        if (!reqInfo) {
            return undefined;
        }
        return reqInfo.cb;
    }

    invoke(data: BaseResData, reqOptions?: ReqOptions, ...args: any[]): Promise<BaseResData<S>> {
        this._reqCount++;
        const {
            timeout = 5000,
            defaultRes = {
                message: "请求超时"
            }
        } = reqOptions || {};

        // 获得key值
        if (!util.hasOwnProperty(data, "_key_")) {
            data._key_ = this.getMethod("getReqkey").apply(this, [data]);
        }
        const hashKey = data._key_;
        const tout = timeout || this._options.timeout;
        const category = this.getMethod("getReqCategory")(data);

        return new Promise((resolve, reject) => {
            const { run, cancel } = util.delay(undefined, tout);
            // 超时
            run().then(() => {
                console.log("请求超时:", category, data, hashKey);
                this.onTimeout();
                if (this._options.clearTimeoutReq) {
                    this.removeReqInfo(category, data?.scope as string, hashKey);
                }
                reject({
                    message: "请求超时",
                    ...(defaultRes || {})
                });
            });

            this.addCallback(category, {
                key: hashKey,
                cb: (msg: any) => {
                    // 取消超时回调
                    cancel();
                    resolve(msg);
                },
                scope: data.scope
            });
            // 调用
            this.getMethod("request")(data, hashKey, ...args);
        });
    }

    private removeReqInfo(category: MessageType, scope: string, key: string | undefined) {
        // 先按照分类查询响应信息
        const cbs = this.cbMap.get(category);
        if (!cbs || cbs.length === 0) {
            return undefined;
        }
        // 精确查找, TODO:: 更加精细
        if (typeof scope === "string" || typeof key === "string") {
            const index = cbs.findIndex(c => c.key === key && isSameScope(c?.scope, scope))
            if (index >= 0) {
                const reqInfo = cbs[index];
                cbs.splice(index, 1);
                return reqInfo;
            }
            return undefined;
        }
        //如果没有key,返回第一个
        return cbs.shift();
    }

    private onTimeout = () => {
        this._timeOutCount++;
    }

    private onError = () => { }

    private onSuccess = (category: MessageType, data: BaseResData<S>) => {
        this._resCount++;
    }

    protected onBuiltInResponse(category: MessageType, data: BaseResData<S>) {
        if (this.passiveEventMessager) {
            this.passiveEventMessager.emit(category, data);
        }

        return data;
    }

    public getStatistics() {
        return {
            total: this._reqCount,
            success: this._resCount,
            timeout: this._timeOutCount
        };
    }

    get addHandler() {
        return this.passiveEventMessager.addHandler || util.noop
    }

    get removeHandler() {
        return this.passiveEventMessager.removeHandler || util.noop;
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.cbMap.clear();
        }
    }
}
