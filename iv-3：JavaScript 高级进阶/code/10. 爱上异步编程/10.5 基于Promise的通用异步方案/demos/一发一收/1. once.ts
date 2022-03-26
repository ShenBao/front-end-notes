import EventEmitter from "events";

const emitter = new EventEmitter();
// 被请求方, 模拟server
emitter.on("message-client-req", ({ type, data }) => {
    console.log("server: message-client-req", type, data);
    emitter.emit("message-client-res", {
        type,
        data: data,
        from: "server"
    })
})

// 请求
function invoke(type: string, data: any = {}) {
    return new Promise((resolve, _reject) => {
        console.log("client:发送请求");
        emitter.once("message-client-res", function (data) {
            resolve(data)
        });
        emitter.emit("message-client-req", { type, data });
    })
}

invoke("ccc", "req1")
    .then(res => console.log("client:req1", res))


