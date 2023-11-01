interface Unsubscribe {
    (): void;
}
interface CallbackFunction<T = any> {
    (context: T, ...args: any[]): void;
}
interface NextFnInfo<T = any> {
    cancel: Unsubscribe;
    execute: (next: CallbackFunction<T>) => any;
}
interface NextFnGenerator {
    (...args: any[]): NextFnInfo;
}
export default class NextGenerator<T = any> {
    private generator;
    private status;
    private nextInfo;
    private cb;
    private args;
    constructor(generator: NextFnGenerator);
    next(...args: any[]): void;
    execute(this: NextGenerator<T>, cb: Function, context: T, ...args: any[]): void;
    cancel(): void;
    start(cb: CallbackFunction, ...args: any[]): void;
    continue(): void;
}
export declare function createRequestAnimationFrameGenerator(): NextGenerator<any>;
export declare function createTimeoutGenerator(interval?: number): NextGenerator<any>;
export declare function createStepUpGenerator(interval?: number): NextGenerator<any>;
export {};
