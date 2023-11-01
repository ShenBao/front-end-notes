import './style.css'
import "./evm";
import "./events";

const app = document.querySelector<HTMLDivElement>('#app')!

const btn1El: HTMLButtonElement = document.getElementById("btn1") as HTMLButtonElement;


function onClick1() {
  console.log("onclick")
}

function onClick2() {
  console.log("onclick")
}

// 添加完全一样的内容，报警
btn1El.addEventListener("click", onClick1);
btn1El.addEventListener("click", onClick2);