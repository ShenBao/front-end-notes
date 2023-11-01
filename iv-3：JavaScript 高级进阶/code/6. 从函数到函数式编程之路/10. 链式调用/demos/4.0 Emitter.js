const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("message", function () {
    console.log("message")
}).on("message1", function () {
    console.log("message1")
})

emitter.emit("message");
emitter.emit("message1");


