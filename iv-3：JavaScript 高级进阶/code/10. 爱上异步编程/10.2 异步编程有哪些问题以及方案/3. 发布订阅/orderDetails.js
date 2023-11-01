import MyMsgCenter from "./MsgCenter.js";


function orderDetails(orderId) {
    if(orderId){
        setTimeout(() => {
            MyMsgCenter.dispatch("orderDetails-over",{ detail:"淘宝订单：购买xxx书一本"})
        }, 1500);
    }
}


function orderIdListener(type,ev) {
    orderDetails(ev.detail);
    MyMsgCenter.unSubscribe(type, orderIdListener);
}



MyMsgCenter.subscribe("orderId-over", orderIdListener);
