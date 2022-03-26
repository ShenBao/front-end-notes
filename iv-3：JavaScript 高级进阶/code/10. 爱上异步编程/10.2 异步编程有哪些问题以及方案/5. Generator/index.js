function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("token");
    }, 3000);
  });
}

function getOrderId(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      setTimeout(() => {
        resolve("orderId");
      }, 2000);
    }
  });
}

function orderDetails(orderId) {
  return new Promise((resolve, reject) => {
    if (orderId) {
      setTimeout(() => {
        resolve("淘宝订单：购买xxx书一本");
      }, 1500);
    }
  });
}

function* execute() {
  const token = yield login();
  const orderId = yield getOrderId(token);
  const orderInfo = yield orderDetails(orderId);
}

let g = execute();

let { value, done } = g.next();

value.then((token) => {
  console.log("token==", token);
  let { value, done } = g.next(token);
  value.then((orderId) => {
    console.log("orderId==", orderId);
    let { value, done } = g.next(orderId);
    value.then((orderInfo) => {
      console.log("orderInfo==", orderInfo);
    });
  });
});
