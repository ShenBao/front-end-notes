
function login(callback) {
    setTimeout(() => {
        callback("token");
    }, 2);
}


function getOrderId(token,callback) {
    if(token){
        setTimeout(() => {
            callback("orderId");
        }, 3);
    }
}

function orderDetails(orderId,callback) {
    if(orderId){
        setTimeout(() => {
            callback("淘宝订单：购买xxx书一本");
        }, 2);
    }
    
}


try{
    login((token) => {
        throw new Error("orderList");
        getOrderId(token,(orderId) => {
            orderDetails(orderId,(orderInfo) => {
                console.log(orderInfo);
            });
        });
    });
}catch(e){
    console.log("try catch error:",e);
}
