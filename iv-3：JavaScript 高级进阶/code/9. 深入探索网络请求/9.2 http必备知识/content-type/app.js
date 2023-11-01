const express = require('express');
const path = require('path');
const multer = require('multer');

const server = express();

server.use(express.urlencoded({
    extended: true,
}));

server.use(express.json())

server.use(express.static(path.join(__dirname, './static')));


server.use("/urlencoded", function (req, res) {
    console.log("收到请求(urlencoded)");
    console.log("body:", req.body);
    res.json({
        code: 10000,
        data: req.body
    })
});

server.use("/multipart", multer().none(), function (req, res) {
    console.log("收到请求(multipart)");
    console.log("body:", req.body);
    res.json({
        code: 10000,
        data: req.body
    })
});


server.use("/json", multer().none(), function (req, res) {
    console.log("收到请求(json)");
    console.log("body:", req.body);
    res.json({
        code: 10000,
        data: req.body
    })
});




server.listen(3000, function () {
    console.log('listening at port 3000')
})