function runPromises(promiseCreators, initData) {
  return promiseCreators.reduce(function (promise, next) {
    return promise.then((data) => next(data));
  }, Promise.resolve(initData));
}

const initData = { name: "name", pwd: "pwd" };

Promise.resolve(initData)
  .then((data) => login(data))
  .then((data) => getUserInfo(data))
  .then((data) => getOrders(data))
  .then((data) => console.log("orders", data));

function login(data) {
  console.log("login: data", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        token: "token",
      });
    }, 500);
  });
}

function getUserInfo(data) {
  console.log("getUserInfo: data", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        name: "user-1",
        id: 988,
      });
    }, 300);
  });
}

function getOrders(data) {
  console.log("getOrders: data", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        {
          orderId: 1,
          productId: 100,
          price: 100,
        },
      ]);
    }, 100);
  });
}

// runPromises([login, getUserInfo, getOrders],
//     initData)
//     .then(res => {
//         console.log("res", res);
//     })
