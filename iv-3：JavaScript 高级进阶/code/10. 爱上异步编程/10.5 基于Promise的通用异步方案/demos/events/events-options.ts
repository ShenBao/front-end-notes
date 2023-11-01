import { BaseAsyncMessager, BaseReqData, BaseResData,  GlobalReqOptions } from "../../src/index";
import EventEmitter from "events";

const emitter = new EventEmitter();

// 初始化异步Messager
const emitterAsyncMessager = new BaseAsyncMessager<any>({
    // logUnhandledEvent: false,
    subscribe(onMessage) {
        console.log("emitterAsyncMessager: subscribe");
        emitter.on("message", onMessage as any);
        return () => {
            emitter.off("message", onMessage  as any);
        }
    },
    getReqCategory(data: BaseReqData) {
        console.log("emitterAsyncMessager： getReqCategory: method", data.method);
        return data.method!;
    },
    getResCategory(data: BaseResData) {
        return data.method!;
    },
    request(data: BaseReqData, key?: string) {
        emitter.emit("message-request", data);
    }
});

const symbolCccc = Symbol.for("cccc");
// const numberCccc = 44444;

/* 模拟emitter另外一端 */ 

// 传统的事件通知
setInterval(() => {
    emitter.emit('message', {
        method: 'continuous-event',
        data: new Date().toLocaleTimeString()
    })
}, 3000)

// 监听 message-request 事件，然后回发事件
emitter.on("message-request", (data: BaseReqData) => {
    setTimeout(() => {
        emitter.emit("message", {
            method: data.method,
            data: `${data.method!.toString()}--- data`
        })
    }, 3000)
})


/*使用方 */

// 调用
emitterAsyncMessager.invoke({
    method: symbolCccc,   // numberCccc
    data: 111
}).then(res => console.log("res:", res))

emitterAsyncMessager.addHandler(symbolCccc, function onEvent(data) {
    console.log("symbolCccc:", data);
})


// 传统的监听事件
emitterAsyncMessager.addHandler("continuous-event", function onEvent(data) {
    console.log("continuous-event:", data);
})


