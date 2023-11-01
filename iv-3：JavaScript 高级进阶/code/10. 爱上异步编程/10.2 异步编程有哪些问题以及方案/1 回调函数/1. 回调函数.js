
function login(callback) {
    setTimeout(() => {
        callback("token");
    }, 3000);
}

function getOrderId(token,callback) {
    if(token){
        setTimeout(() => {
            callback("orderId");
        }, 2000);
    }
}

function orderDetails(orderId,callback) {
    if(orderId){
        setTimeout(() => {
            callback("淘宝订单：购买xxx书一本");
        }, 1500);
    }
}


login((token) => {
    getOrderId(token,(orderId) => {
        orderDetails(orderId,(orderInfo) => {
            console.log(orderInfo);
        });
    });
});