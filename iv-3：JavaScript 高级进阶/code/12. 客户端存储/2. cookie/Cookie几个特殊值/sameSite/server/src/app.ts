import https from "https";
import fs from "fs";
import path from "path";
import express from "express";
import createError from "http-errors";
const bodyParser = require('body-parser');



const port = 443;

const httpsDir = path.join(__dirname, "/https");

const app = express();

const privateKey = fs.readFileSync(path.join(httpsDir, '127.0.0.1_key.txt'), 'utf8')
const certificate = fs.readFileSync(path.join(httpsDir, '127.0.0.1_ssl.crt'), 'utf8')
const credentials = { key: privateKey, cert: certificate }

// 存储文件目录
const uploadDIr = path.join(__dirname, "/upload");

//设置静态访问目录

app.use(express.static(uploadDIr));
app.use(bodyParser.urlencoded({ extended: true }));
const server = https.createServer(credentials, app);


// let whitList = ['http://127.0.0.1:5500',] //设置白名单

//设置跨域访问
app.use(function (req: any, res: any, next: any) {
    const origin = req.headers.origin as string;

    console.log("origin:", origin)
    // if (whitList.includes(origin)) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", origin);
    //允许携带凭证
    res.header("Access-Control-Allow-Credentials", 'true');
    //允许的header类型
    res.header("Access-Control-Allow-Headers", ["content-type", "Origin", "Accept"]);

    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    //预检结果保存时间 1小时
    res.header("Access-Control-Max-Age", `${5}`);
    if (req.method.toLowerCase() == 'options') {
        res.send(204);  //让options尝试请求快速结束
        return;
    }
    // }
    next();
});

app.get('/', (_req, res) => {

    res.send("hello world");
});


app.post('/login', (_req, res) => {

    console.log('req:cookie', _req.headers['cookie']);


    // 原来旧版的种植cookie方式。
    // res.cookie("cid", '666', {
    //     path: "/", maxAge: 20 * 1200,
    //     secure: true,
    //     sameSite: 'lax'
    // });


    //新版 设置cookie,设置SameSite
    res.cookie("ci55", '555', {
        path: "/",
        maxAge: 20 * 1200,
        sameSite: 'none', // 新增 配合secure使用
        secure: true,   //新增
    });
    return res.json({
        REV: true,
        DATA: {
            msg: "成功"
        }
    });
});



app.post('/test', (_req, res) => {

    return res.json({
        REV: true,
        DATA: {
            msg: "成功"
        }
    });
});

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
