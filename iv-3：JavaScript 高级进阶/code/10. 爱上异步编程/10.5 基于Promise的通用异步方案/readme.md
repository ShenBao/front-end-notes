
## 摘要
异步回调转Promise通用方案。支持EventEmitter, MQTT, socket.io, iframe， webview等等场景。


## 依赖
其依赖了ES6的Map, 如果项目已经使用了[core-js](https://www.npmjs.com/package/core-js)，直接引用其map就行。

如果仅仅单独引入Map, 建议[es6-map](github.com/medikoo/es6-map)


## 示例代码




### EventEmitter

```js
import { BaseAsyncMessager, BaseReqData, GlobalReqOptions } from "../src/index";
import EventEmitter from "events";

const emitter = new EventEmitter();

interface RequestData extends BaseReqData {
    method: string;
    data?: any;
}
type ResponseData = RequestData;


// 初始化异步Messager
const emitterAsyncMessager = new BaseAsyncMessager<RequestData>({
    subscribe(onMessage) {
        console.log("emitterAsyncMessager: subscribe");
        emitter.on("message", onMessage as any);
        return () => {
            emitter.off("message", onMessage  as any);
        }
    },
    getReqCategory(data: RequestData) {
        console.log("emitterAsyncMessager： getReqCategory: method", data.method);
        return data.method;
    },
    getResCategory(data: ResponseData) {
        return data.method;
    },
    request(data: RequestData, key?: string) {
        emitter.emit("message-request", data);
    }
});


/* 模拟emitter另外一端 */ 

// 传统的事件通知
setInterval(() => {
    emitter.emit('message', {
        method: 'continuous-event',
        data: new Date().toLocaleTimeString()
    })
}, 3000)

// 监听 message-request 事件，然后回发事件
emitter.on("message-request", (data: RequestData) => {
    setTimeout(() => {
        emitter.emit("message", {
            method: data.method,
            data: `${data.method}--- data`
        })
    }, 3000)
})



/*使用方 */

// 调用
emitterAsyncMessager.invoke({
    method: "cccc",
    data: 111
}).then(res => console.log("res:", res))

// 传统的监听事件
emitterAsyncMessager.addHandler("continuous-event", function onEvent(data) {
    console.log("continuous-event:", data);
})

```

### iframe

```html
    <iframe src="./iframe1.html" id="ifr"></iframe>
    <script src="../../dist/asyncMessager.js"></script>
    <script>

        function sendMessage(msg) {
            iframe1.contentWindow.postMessage(msg)
        }
        const iframe1 = document.getElementById("ifr");

        const asyncMessager = new AsyncMessager.BaseAsyncMessager({
            // logUnhandledEvent: false,
            subscribe(onMessage) {
                function onIframeMessage(msg) {
                    onMessage(msg.data);
                }
                window.addEventListener("message", onIframeMessage);
                return () => {
                    window.removeEventListener("message", onIframeMessage);
                }
            },
            getReqCategory(data) {
                console.log("asyncMessager getReqCategory: method", data.method);
                return data.method;
            },
            getResCategory(data) {
                return data.method;
            },
            request(data, key) {
                sendMessage(data);
            }
        });

        iframe1.contentWindow.onload = () => {
            asyncMessager.invoke({
                method: "init",
                data: {
                    user: 123456,
                    token: "blabla......"
                }
            }).then(res => console.log("index.html:", res, res))
        }
        asyncMessager.addHandler("timeInfo", function(data){
            console.log("index.html:timeInfo", data);
        })


    </script>
```

## socket.io

不到20行代码，就实现了异步编程。

```js
const socket = io("http://localhost:3000");

function sendMessage(msg) {
    socket.emit("message", msg)
}

const asyncMessager = new AsyncMessager.BaseAsyncMessager({
    // logUnhandledEvent: false,
    subscribe(onMessage) {
        function onSocketMessage(msg) {
            onMessage(msg);
        }
        socket.on("message", onSocketMessage);
        return () => {
            socket.off("message", onSocketMessage);
        }
    },    
    request(data, key) {
        sendMessage(data);
    }
});

socket.on("connect", () => {
    console.log("connect")
    asyncMessager.invoke({
        method: "getUsers",
        data: {
            user: 123456,
            token: "blabla......"
        }
    }).then(res => console.log("index.html:", res, res))
});

asyncMessager.addHandler("timeInfo", function (data) {
    console.log("index.html:timeInfo", data);
});

```