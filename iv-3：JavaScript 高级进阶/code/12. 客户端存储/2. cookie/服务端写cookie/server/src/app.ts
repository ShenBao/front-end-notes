import http from "http";
import express from "express";
import createError from "http-errors";
const bodyParser = require('body-parser');



const port = 3000;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);


let whitList = ['http://127.0.0.1:5500'] //设置白名单

//设置跨域访问
app.use(function (req: any, res: any, next: any) {
    const origin = req.headers.origin as string;
    if (whitList.includes(origin)) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", origin);
        //允许携带凭证
        res.header("Access-Control-Allow-Credentials", 'true');
        //允许的header类型
        res.header("Access-Control-Allow-Headers", ["X-PINGOTHER", "content-type", "Origin", "Accept"]);

        //跨域允许的请求方式 
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

        //预检结果保存时间 1小时
        res.header("Access-Control-Max-Age", `${5}`);
        if (req.method.toLowerCase() == 'options') {
            res.send(204);  //让options尝试请求快速结束
            return;
        }
    }
    next();
});



app.post('/login', (_req, res) => {
    //设置cookie
    res.setHeader('Set-Cookie', ['userToken=1111;Max-Age=86400;']);
    // 或者
    res.cookie("cid", '555', { maxAge: 86400, httpOnly: true });
    return res.json({
        REV: true,
        DATA: {
            msg: "成功"
        }
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



