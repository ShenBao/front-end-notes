import http from "http";
import express from "express";
import createError from "http-errors";
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
const cors = require('cors');



const port = 3000;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);



let whitList = ['http://127.0.0.1:5500'] //设置白名单


var corsOptions = {
    origin: function (origin, callback) {
        if (whitList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    maxAge: 20,
    allowedHeaders: ["X-PINGOTHER", "content-type", "Origin", "Accept"]
}

app.use(cors(corsOptions));



app.post("/report", (_req, _res) => {
    console.log("收到req.body:", _req.body);
    const form = new multiparty.Form();
    form.parse(_req, (_err: any, _fields: any, _files: any) => {
        console.log("收到req.formData:", _fields);
    });

    return _res.json({
        REV: true,
        DATA: {
            msg: "成功"
        }
    });
});



app.get('/test1', (_req, res) => {
    console.log("收到请求==");
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
