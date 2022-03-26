import http from "http";
import bodyParser from 'body-parser';
import express from "express";
import createError from "http-errors";
var urlLib = require('url');


const port = 3000;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

app.get('/jsonp_request', (_req, res) => {
    const params = urlLib.parse(_req.url, true);
    if (params.query && params.query.callback) {
        var str = params.query.callback + '(' + JSON.stringify({ test: "服务端数据" }) + ')';
        res.send(str);
    } else {
        res.send('world')
    }
    console.log(params.query.callback);
})



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
