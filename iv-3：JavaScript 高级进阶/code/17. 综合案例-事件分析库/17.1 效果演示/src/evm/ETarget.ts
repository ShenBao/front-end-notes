import BaseEvm from "../BaseEvm";

import { BaseEvmOptions, EVMBaseEventListener, ListenerWrapper, TypeListenerOptions } from "../types";
import { booleanFalse, isFunction, isObject, isSameETOptions } from "../util";

const DEFAULT_OPTIONS: BaseEvmOptions = {
    isInWhiteList: booleanFalse,
    isSameOptions: isSameETOptions
}

const ADD_PROPERTIES = ["addEventListener"];
const REMOVE_PROPERTIES = ["removeEventListener"];

/**
 * EVM for EventTarget
 */
export default class ETargetEVM extends BaseEvm<TypeListenerOptions> {

    protected orgEtPrototype: any;
    protected rpList: {
        proxy: object;
        revoke: () => void;
    }[] = [];
    protected et: any;

    constructor(options: BaseEvmOptions = DEFAULT_OPTIONS, et: any = EventTarget) {
        super({
            ...DEFAULT_OPTIONS,
            ...options
        });

        if (et == null || !isObject(et.prototype)) {
            throw new Error("参数et的原型必须是一个有效的对象")
        }
        this.orgEtPrototype = { ...et };
        this.et = et;

    }

    #getListener(listener: Function | ListenerWrapper) {
        if (typeof listener == "function") {
            return listener
        }
        return null;
    }

    #innerAddCallback: EVMBaseEventListener<void, string> = (target, event, listener, options) => {
        const fn = this.#getListener(listener)
        if (!isFunction(fn as Function)) {
            return;
        }
        return super.innerAddCallback(target, event, fn as Function, options);
    }

    #innerRemoveCallback: EVMBaseEventListener<void, string> = (target, event, listener, options) => {
        const fn = this.#getListener(listener)
        if (!isFunction(fn as Function)) {
            return;
        }
        return super.innerRemoveCallback(target, event, fn as Function, options);
    }


    watch() {
        super.watch();
        let rp;
        // addEventListener 
        rp = this.checkAndProxy(this.et.prototype, this.#innerAddCallback, ADD_PROPERTIES);
        if (rp !== null) {
            this.rpList.push(rp);
        }
        // removeEventListener
        rp = this.checkAndProxy(this.et.prototype, this.#innerRemoveCallback, REMOVE_PROPERTIES);
        if (rp !== null) {
            this.rpList.push(rp);
        }

        return () => this.cancel();
    }

    cancel() {
        super.cancel();
        this.restoreProperties(this.et.prototype, this.orgEtPrototype, ADD_PROPERTIES);
        this.restoreProperties(this.et.prototype, this.orgEtPrototype, REMOVE_PROPERTIES);
        this.rpList.forEach(rp => rp.revoke());
        this.rpList = [];
    }
}