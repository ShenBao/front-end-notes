

const orderDetailsEvent = new CustomEvent("orderDetails-over", {
    detail: "淘宝订单：购买xxx书一本" 
});

function orderDetails(orderId) {
    if(orderId){
        setTimeout(() => {
            window.dispatchEvent(orderDetailsEvent);
        }, 1500);
    }
}


function orderIdListener(ev) {
    orderDetails(ev.detail);
}



//在window 上添加监听事件
window.addEventListener("orderId-over", orderIdListener);