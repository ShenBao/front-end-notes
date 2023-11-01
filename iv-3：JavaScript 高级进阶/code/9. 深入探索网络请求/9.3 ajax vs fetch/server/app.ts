import http from "http";
import bodyParser from "body-parser";
import express from "express";
import createError from "http-errors";
// const multiparty = require('multiparty');

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

//设置跨域访问
app.use(function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    //"*"
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    //允许携带cookie
    res.header("Access-Control-Allow-Credentials", "true");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", [
        "X-PINGOTHER",
        "content-type",
        "Origin",
        "X-Requested-With",
    ]);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    res.header("Access-Control-Max-Age", `${20}`);
    if (req.method.toLowerCase() == "options") res.send(200);
    //让options尝试请求快速结束
    else next();
});

app.post("/xhr", async (_req, _res) => {
    console.log("xhr: 收到请求");

    await sleep(10 * 1000);

    _res.json({
        code: 10000,
    });
});

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

app.get("/fetch", async (_req, res) => {
    console.log("fetch:收到请求", _req.url);
    await sleep(10 * 1000);
    return res.json({
        code: 10000
    });
});

app.get("/test1", (_req, res) => {
    res.send("test1");
});

app.get("/test2", (_req, res) => {
    res.send("test2");
});


app.get("/timeout", async (_req, res) => {
    await sleep(12 * 1000);
    res.send("test2");
});

app.get("/test4", async (_req, res) => {
    console.log("收到请求=test4=", _req.url);
    // res.send('hello')
    await sleep(30000);
    return res.json({
        REV: true,
        DATA: {
            msg: "成功",
        },
    });
});

server.listen(port, () => {
    console.log("监听端口:", port);
});

// catch 404 and forward to error handler
app.use(
    (
        _req: express.Request,
        _res: express.Response,
        next: express.NextFunction
    ) => {
        const error = createError(404);
        next(error);
    }
);

process.on(
    "unhandledRejection",
    (reason: {} | null | undefined, p: Promise<any>) => {
        console.error("自定义错误 Unhandled Rejection at:", p, "reason:", reason);
        // application specific logging, throwing an error, or other logic here
    }
);
