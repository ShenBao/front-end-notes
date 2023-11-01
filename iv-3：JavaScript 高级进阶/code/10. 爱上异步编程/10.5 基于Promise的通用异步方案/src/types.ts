
export type MessageType = Symbol | string | number | undefined;

export interface BaseReqData<R = any> {
    /**
     * 请求的唯一标记
     */
    _key_?: string;
    /**
     * scope，区分多个渠道
     * 比如页面打开多个iframe，我们监听的是window的message的事件，
     * 当多个iframe发送出消息时，屏蔽消息
     */
    scope?: string;
    /**
     * 区分类型的字段，默认是type|method 
     */
    type?: MessageType;
    /**
     * 区分类型的字段，默认是type|method 
     */
    method?: MessageType;
    /**
     * 数据部分
     */
    data?: R;
}


export type BaseResData<S = any> = BaseReqData<S>

export interface ReqInfo<R = any> {
    key: string | undefined;
    cb: Function;
    reqData?: R;
    reqTime?: number;
    scope: string | undefined;
}

export type Unsubscribe = () => void;

export interface GlobalReqOptions<R = any, S = any> {
    timeout?: number;
    autoSubscribe?: boolean;
    clearTimeoutReq?: boolean;
    /**
     * clearTimeoutReq开启后，过期多少时间的请求会被清理
     */
    expiredTime?: number;
    enableLog?: boolean;
    /**
     * 输出未处理的事件回调
     */
    logUnhandledEvent?: boolean;
    /**
     * 订阅
     */
    subscribe?(onMessage?: Function): Unsubscribe;
    /**
     * 获得请求的key
     * @param data 
     */
    getReqkey?<R>(data: BaseReqData<R>): string;
    /**
     * 获取请求的Category
     * @param data 
     */
    getReqCategory?(data: BaseReqData<R>): MessageType;
    /**
     * 获得响应的Key
     * @param data 
     */
    getResKey?(data: BaseResData<S>): string
    /**
     * 打开多个被请求方， 比如多个webview
     */
    getResSope?: (data: BaseResData<S>) => string | string[];
    /**
     * 提供返回后，再处理数据的能力
     */
    onResponse?: (data: BaseResData<S>) => BaseResData<S>;
    /**
     * 获取响应的Category
     * @param data 
     */
    getResCategory?(data: BaseResData<S>): MessageType;
    /**
     * 真正的请求
     * @param data 
     * @param key 
     */
    request?(data: BaseResData<S>, key: string): any;
    /**
     * 获取hashCode
     * @param data 
     */
    getHashCode?(data: BaseReqData<R>): string | number;
}


export interface ReqOptions {
    timeout?: number;
    defaultRes?: any;
}