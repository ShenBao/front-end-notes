
import {login} from  "./login.js";
import MyMsgCenter from "./MsgCenter.js";


function resultListener(type,ev) {
    console.log("收到结果：",ev.detail);
    MyMsgCenter.unSubscribe(type, resultListener);
}

MyMsgCenter.subscribe("orderDetails-over", resultListener);


window.login=login;
