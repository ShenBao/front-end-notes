const path = require('path');
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(express.static(path.join(__dirname, "./static")));

io.on("connection", (socket) => {

    console.log("connection:", socket.id);

    socket.on("message", function ({ method, data }) {

        console.log("message", method, data);

        switch (method) {

            case "getUsers":
                socket.emit("message", {
                    method: "getUsers",
                    data: [{
                        id: 1,
                        name: "John",
                    }, {
                        id: 2,
                        name: "Tom"
                    }]
                })
                break;
            case "getMoney":
                socket.emit("message", {
                    method: "getMoney",
                    data: 10000
                })
                break;
            default:
                console.log("未处理的消息", method, data);
        }
    })

    setInterval(() => {
        socket.emit("message", {
            method: "timeInfo",
            data: Date.now()
        })
    }, 3000)
});

httpServer.listen(3000, function(){
    console.log("listen at prot: 3000")
});