import EventEmitter from "eventemitter3";

const emitter = new EventEmitter();


function event1(){
    console.log("event-1");
}

emitter.addListener("event-1", event1)
emitter.addListener("event-1", event1)
emitter.addListener("event-1", event1)
emitter.addListener("event-2", event1)

setInterval(()=>{
    emitter.emit("event-1", "haha")
},15000)