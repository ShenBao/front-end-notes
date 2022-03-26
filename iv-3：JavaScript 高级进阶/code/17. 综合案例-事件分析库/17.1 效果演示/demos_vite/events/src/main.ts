import { EventsEVM } from "../../../src/index"
import { EventEmitter } from "events";

const evm = new EventsEVM(undefined, EventEmitter);
evm.watch();

const emitter = new EventEmitter();


function event1(){
  console.log("event1")
}

function event2(){
  console.log("event2")
}


function event3(){
  console.log("event3")
}



emitter.addListener("event1", event1);
emitter.on("event1", event1);
emitter.on("event1", event1);


emitter.on("event2", event2);
emitter.on("event2", event2);



emitter.on("event3", event3);


setInterval(async function () {
  // console.log("-------");
  const data = await evm.getExtremelyItems();
  console.log("statistics:", data);
}, 3000)


// 防止被回收
setInterval(()=>{
  console.log("emitter", emitter.getMaxListeners())
}, 150000)
