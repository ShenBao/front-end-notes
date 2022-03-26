import MyMsgCenter from "./MsgCenter.js";



function getOrderId(token) {
    if(token){
        setTimeout(() => {
            MyMsgCenter.dispatch("orderId-over",{ detail:"orderId"})
        }, 2000);
    }
}


function tokenListener(type,ev) {
    getOrderId(ev.detail);
    MyMsgCenter.unSubscribe(type, tokenListener);
}

MyMsgCenter.subscribe("login-over", tokenListener);

