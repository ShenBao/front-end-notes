import express from "express";
import fs from "fs";
import createError from "http-errors";
import https from "https";
import path from "path";

const port = 660;

const httpsDir = path.join(__dirname, "/https");

const app = express();

const privateKey = fs.readFileSync(path.join(httpsDir, '127.0.0.1_key.txt'), 'utf8')
const certificate = fs.readFileSync(path.join(httpsDir, '127.0.0.1_ssl.crt'), 'utf8')
const credentials = { key: privateKey, cert: certificate }

// 静态htmls目录
const staticDir = path.join(__dirname, "/htmls");

//设置静态访问目录

app.use(express.static(staticDir));
const server = https.createServer(credentials, app);

server.listen(port, () => {
    console.log("https监听端口:", port);
});
// catch 404 and forward to error handler
app.use(
    (
        _req: express.Request,
        _res: express.Response,
        next: any
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
