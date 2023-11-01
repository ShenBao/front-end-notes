function login() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("token")
        }, 3000);
    })
}


function getOrderId(token) {
    return new Promise((resolve, reject) => {
        if (token) {
            setTimeout(() => {
                resolve("orderId");
            }, 2000);
        }
    })
}

function orderDetails(orderId) {
    return new Promise((resolve, reject) => {
        if (orderId) {
            setTimeout(() => {
                resolve("淘宝订单：购买xxx书一本");
            }, 1500);
        }
    })

}


async function execute() {
    const token = await login();
    const orderId = await getOrderId(token);
    const orderInfo = await orderDetails(orderId);
    console.log(orderInfo);
}

execute();