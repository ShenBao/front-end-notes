var startEvent = new Event("start", { bubbles: false, cancelable: false });

function listener(ev) {
  console.log("收到事件", ev.type);
}
//在document 上添加监听事件
document.addEventListener("start", listener);

setTimeout(() => {
  //触发start 事件
  document.dispatchEvent(startEvent);
  ////移除start 监听
  document.removeEventListener("start", listener);
}, 2000);

setTimeout(() => {
  //继续触发start 事件
  document.dispatchEvent(startEvent);
}, 3000);

// 事件可以在任何元素触发，不仅仅是document
