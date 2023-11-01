import http from "http";
import bodyParser from "body-parser";
import express from "express";
import path = require("path");
import createError from "http-errors";
const multer = require("multer");

const port = 3000;

const app = express();

// 上传成功后返回URL地址
const resourceUrl = `http://127.0.0.1:${port}/`;

// 存储文件目录
const uploadDIr = path.join(__dirname, "/upload");

// destination 设置资源保存路径，filename 设置资源名称
const storage = multer.diskStorage({
  destination: async function (_req, _file, cb) {
    cb(null, uploadDIr);
  },
  filename: function (_req, file, cb) {
    // 设置文件名
    cb(null, `${file.originalname}`);
  },
});

const multerUpload = multer({ storage });

//设置静态访问目录
app.use(express.static(uploadDIr));

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
  res.header("Access-Control-Allow-Headers", ["content-type", "Origin"]);
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

  res.header("Access-Control-Max-Age", `${20}`);
  if (req.method.toLowerCase() == "options") res.send(200);
  //让options尝试请求快速结束
  else next();
});

app.post("/upload", multerUpload.any(), function (req, res, _next) {
  // req.file 是 `avatar` 文件的信息

  let urls = [];
  //获取所有已上传的文件
  const files = (req as any).files;

  if (files && files.length > 0) {
    //遍历生成url 集合返回给客户端
    urls = files.map((item, _key) => {
      return resourceUrl + item.originalname;
    });
  }

  return res.json({
    REV: true,
    DATA: {
      url: urls,
    },
    MSG: "成功",
  });
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
