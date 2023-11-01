import http from "http";
import express from "express";
import path = require("path");
import createError from "http-errors";

const port = 3000;

const app = express();



// 存储文件目录
const staticDIr = path.join(__dirname, "/static");

let options = {
    setHeaders: function (res) {
        res.set('Access-Control-Allow-Origin', '*')
    }
}

//设置静态访问目录
app.use(express.static(staticDIr, options));


const server = http.createServer(app);


server.listen(port, () => {
    console.log("监听端口:", port);
});

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
