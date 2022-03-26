const express = require('express');
const path = require('path');

const server = express();

server.use(express.urlencoded({
    extended: true,
}));
server.use(express.json())


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

server.use(express.static(path.join(__dirname, './static')));

server.use("/1.css", async function (req, res) {
    await sleep(1000);
    res.sendFile(path.join(__dirname, './resources/1.css'))
});

server.use("/index.js", async function (req, res) {
    await sleep(3000);
    res.sendFile(path.join(__dirname, './resources/index.js'))
});
server.use("/index1.js", async function (req, res) {
    await sleep(8000);
    res.sendFile(path.join(__dirname, './resources/index1.js'))
});
server.use("/index2.js", async function (req, res) {
    await sleep(8000);
    res.sendFile(path.join(__dirname, './resources/index2.js'))
});
server.use("/index3.js", async function (req, res) {
    await sleep(8000);
    res.sendFile(path.join(__dirname, './resources/index3.js'))
});
server.use("/index4.js", async function (req, res) {
    await sleep(8000);
    res.sendFile(path.join(__dirname, './resources/index4.js'))
});
server.use("/index5.js", async function (req, res) {
    await sleep(8000);
    res.sendFile(path.join(__dirname, './resources/index5.js'))
});
server.use("/index6.js", async function (req, res) {
    await sleep(5000);
    res.sendFile(path.join(__dirname, './resources/index6.js'))
});


server.listen(3000, function () {
    console.log('listening at port 3000')
})