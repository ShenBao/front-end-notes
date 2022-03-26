import EventEmitter from "events";

const emitter = new EventEmitter();
// 被请求方, 模拟server
emitter.on("message-client-req", ({ type, data }) => {
    console.log("server: message-client-req", { type, data });
    setTimeout(() => {
        emitter.emit("message-client-res", {
            type,
            data: data,
            from: "server"
        })
    }, 16)
})

// 等待响应列表
const queues: any[] = [];
// 请求
function invoke(type: string, data: any = {}) {
    return new Promise((resolve, _reject) => {
        console.log("client:发送请求");
        queues.push({
            type,
            resolve
        })
        emitter.emit("message-client-req", { type, data });
    })
}

// 统一的响应处理
emitter.on("message-client-res", function (data: any) {
    // 去列表里面查找对应的回调
    const index = queues.findIndex(c => c.type === data.type);
    console.log("index:", index);
    if (index >= 0) {
        const qItem = queues[index];
        // 执行回调
        qItem.resolve(data);
        // 删除
        queues.splice(index, 1);
    }
});

invoke("ccc", "req1").then(res => console.log("client:req1:res", res))
invoke("ccc", "req2").then(res => console.log("client:req2:res", res))
