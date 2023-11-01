import http from "http";
import express from "express";
import path = require("path");
import { checkFileIsMerge, chunkMerge } from "./upload";
import createError from "http-errors";
const multiparty = require("multiparty");
const fse = require("fs-extra");

const port = 3000;

const app = express();


// 上传成功后返回URL地址
const resourceUrl = `http://127.0.0.1:${port}/`;

// 存储文件目录
const uploadDIr = path.join(__dirname, "/upload");



//设置静态访问目录

app.use(express.static(uploadDIr));
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
        "content-type",
        "Origin",
    ]);
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    res.header("Access-Control-Max-Age", `${20}`);
    if (req.method.toLowerCase() == "options") res.send(200);
    //让options尝试请求快速结束
    else next();
});

/**
 * 提取文件后缀名
 * @param filename 
 * @returns 
 */
const extractExt = filename =>
    filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名


app.post('/uploadBigFile', function (req, res, _next) {
    const multipart = new multiparty.Form();

    multipart.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.json({
                code: 5000,
                data: null,
                msg: "上传文件失败"
            });
        }
        //取出文件内容
        const [chunk] = files.chunk;
        //当前chunk 文件hash
        const [hash] = fields.hash;
        //大文件的hash
        const [fileHash] = fields.fileHash;
        //大文件的名称
        const [fileName] = fields.fileName;
        //切片索引
        const [index] = fields.index;
        //总共切片个数
        const [fileCount] = fields.fileCount;
        //当前chunk 的大小
        // const [size] = fields.size;
        const [splitSize] = fields.splitSize;
        //整个文件大小
        const [totalSize] = fields.totalSize;

        const saveFileName = `${fileHash}${extractExt(fileName)}`;
        //获取整个文件存储路径
        const filePath = path.resolve(
            uploadDIr,
            saveFileName
        );

        const chunkDir = path.resolve(uploadDIr, fileHash);

        // 大文件存在直接返回,根据内容hash存储，可以实现后续秒传
        if (fse.existsSync(filePath)) {
            return res.json({
                code: 1000,
                data: { url: `${resourceUrl}${saveFileName}` },
                msg: "上传文件已存在"
            });
        }

        // 切片目录不存在，创建切片目录
        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }


        const chunkFile = path.resolve(chunkDir, hash);
        if (!fse.existsSync(chunkFile)) {
            await fse.move(chunk.path, path.resolve(chunkDir, hash));
        }

        const isMerge = checkFileIsMerge(chunkDir, Number(fileCount), fileHash);
        if (isMerge) {
            //合并
            await chunkMerge({
                filePath: filePath,
                fileHash: fileHash,
                chunkDir: chunkDir,
                splitSize: Number(splitSize),
                fileCount: Number(fileCount),
                totalSize: Number(totalSize),
            });
            return res.json({
                code: 1000,
                data: { url: `${resourceUrl}${saveFileName}` },
                msg: "文件上传成功"
            });
        } else {
            return res.json({
                code: 200,
                data: { url: `${resourceUrl}${filePath}` },
                msg: "文件上传成功"
            });
        }
    })

});






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
