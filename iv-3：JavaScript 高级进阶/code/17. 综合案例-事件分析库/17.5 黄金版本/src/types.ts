export interface ListenerOptions {
    once?: boolean;
    capture?: boolean;
    passive?: boolean;
    signal?: AbortSignal
}


export type TypeListenerOptions = boolean | ListenerOptions | undefined;


export interface EventsMapItem<O = any> {
    listener: WeakRef<Function>;
    options: O
}

export interface EventEmitterItem {
    listener: Function;
    once?: boolean;
}

export interface ISameOptions<O = any> {
    (options1: O, options2: O): boolean;
}

export interface ISameFunction {
    (fn1: any, fn2: any, ...args: any[]): boolean;
}

export interface BaseEvmOptions<S = any> {
    /**
     * 是否是相同选项
     */
    isSameOptions?: ISameOptions<S>;
    /**
     * 白名单
     */
    isInWhiteList?: EVMBaseEventListener<boolean>;
    /**
     * 最大的函数内容截取长度
     */
    maxContentLength?: number;
    /**
     * 是否重写bind函数
     */
    overrideBind?: boolean;
}


export interface EVMBaseEventListener<R = void, ET = EventType> {
    (target: Object, event: ET, listener: Function, options: TypeListenerOptions): R
}

export interface ListenerWrapper {
    listener: Function
}

export interface StatisticsOptions {
    containsContent?: boolean;
    forceGC?: boolean;
}

export interface EvmEventsMapOptions {
    isSameOptions?: ISameOptions;
    isSameFunction?(fun1: Function, fun2: Function): boolean;
}


export type EventType = string | Symbol | number;

type EVMOptions = BaseEvmOptions & {
    et?: Object
}

export interface CreateOptions {
    events?: EVMOptions,
    cEvents?: EVMOptions,
    eTarget?: EVMOptions
}

export enum EnumEVMType {
    events = "events",
    cEvents = "cEvents",
    eTarget = "eTarget"
}