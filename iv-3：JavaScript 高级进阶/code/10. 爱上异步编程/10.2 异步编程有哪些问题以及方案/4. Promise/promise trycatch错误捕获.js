function login() {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            // resolve("token")
            resolve()
        }, 3000);
    })
}


function getOrderId(token) {
    return new Promise((resolve,reject)=>{
        if(token){
            setTimeout(() => {
                resolve("orderId");
            }, 2000);
        }else{
            throw new Error("token 未定义");
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



try{
    login().then(getOrderId).then(orderDetails).then((result)=>{
        console.log(result);
    });
    
    // login().then(getOrderId).then(orderDetails).then((result)=>{
    //     console.log(result);
    // }).catch((e)=>{
        console.log("promise catch捕获到错误:",e);
    })
    
}catch(e){
    console.log("捕获到错误:",e);
}


