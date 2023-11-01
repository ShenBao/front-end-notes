import { BaseAsyncMessager, BaseReqData, GlobalReqOptions } from "../../src/index";
import EventEmitter from "events";


type RequestData  = BaseReqData;
type ResponseData = RequestData;

const emitter = new EventEmitter();
class EmitterAsyncMessager extends BaseAsyncMessager<RequestData, ResponseData> {
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
    protected request(data: RequestData, _key?: string) {
        emitter.emit("message-request", data);
    }
}

const emitterAsyncMessager = new EmitterAsyncMessager();
emitterAsyncMessager.subscribe();

setInterval(() => {
    emitter.emit('message', {
        method: 'continuous-event',
        data: new Date().toLocaleTimeString()
    })
}, 3000)
emitter.on("message-request", (data: RequestData) => {
    setTimeout(() => {
        emitter.emit("message", {
            method: data.method,
            data: `${data.method}--- data`
        })
    }, 3000)
})


emitterAsyncMessager.invoke({
    method: "cccc",
    data: 111
}).then(res => console.log("res:", res))


emitterAsyncMessager.addHandler("continuous-event", function onEvent(data) {
    console.log("continuous-event:", data);
})


