
const orderIdEvent = new CustomEvent("orderId-over", {
    detail: "orderId" 
});

function getOrderId(token) {
    if(token){
        setTimeout(() => {
            window.dispatchEvent(orderIdEvent);
        }, 2000);
    }
}

function tokenListener(ev) {
    getOrderId(ev.detail);
}
//在window 上添加监听事件
window.addEventListener("login-over", tokenListener);