import { BaseAsyncMessager, BaseReqData, GlobalReqOptions } from "../../src/index";
import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("message-request", function (data: BaseReqData) {
    switch (data.method) {
        case "method1":
            setTimeout(function () {
                emitter.emit("message", {
                    method: data.method,
                    _key_: data._key_,
                    data: `res_method1`
                })
            }, Math.random() * 2000)
            break;
    }
})

class EmitterAsyncMessager extends BaseAsyncMessager<any, any> {
    // eslint-disable-next-line no-useless-constructor
    constructor(options: GlobalReqOptions = {}) {
        super(options);
    }

    subscribe() {
        console.log("WebViewBridge: subscribe");
        emitter.on("message", this.onMessage);
        return () => {
            emitter.off("message", this.onMessage);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected request(data: BaseReqData, key?: string) {
        emitter.emit("message-request", data);
    }
}

const emitterAsyncMessager = new EmitterAsyncMessager();
emitterAsyncMessager.subscribe();


// key相同，返回相同
emitterAsyncMessager.invoke({
    method: "method1",
    data: "data2",
    _key_: "key2"
}).then(res=>console.log("res1_key2", res));

emitterAsyncMessager.invoke({
    method: "method1",
    data: "data1",
    _key_: "key1"
}).then(res=>console.log("res_key1", res));

