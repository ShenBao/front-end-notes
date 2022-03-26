function login() {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("token")
        }, 3000);
    })
}


function getOrderId(token) {
    return new Promise((resolve,reject)=>{
        if(token){
            setTimeout(() => {
                resolve("orderId");
            }, 2000);
        }
    })    
}

function orderDetails(orderId) {
    return new Promise((resolve,reject)=>{
        if(orderId){
            setTimeout(() => {
                resolve("淘宝订单：购买xxx书一本");
            }, 1500);
        }
    })
    
}




login().then(getOrderId).then(orderDetails).then((result)=>{
    console.log(result);
});


//还可以这样写
// const resultPromise=login().then(getOrderId).then(orderDetails);

// resultPromise.then((result)=>{
//     console.log(result);
// })