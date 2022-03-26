import EventEmitter from "events";

const emitter = new EventEmitter();
// 被请求方, 模拟server
emitter.on("message-client-req", ({ type, data }) => {
    // console.log("server: message-client-req", { type, data });
    const time = Math.random() * 1000;
    console.log("server: cost", time, data)
    setTimeout((resData) => {
        emitter.emit("message-client-res", {
            type,
            data: resData,
            from: "server"
        })
        // 第三个参数传递数据
    }, time, data)
})

// 等待响应的队列
const queues: any[] = [];
// 统一的响应处理
emitter.on("message-client-res", function (data: any) {
    // 去队列里面查找对应的回调
    const index = queues.findIndex(c => c.type === data.type);
    if (index >= 0) {
        const qItem = queues[index];
        // 执行回调
        qItem.resolve(data);
        // 删除
        queues.splice(index, 1);
    }
});

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

invoke("ccc", "req1").then(res => console.log("client:req1:res", res))
invoke("ccc", "req2").then(res => console.log("client:req2:res", res))


