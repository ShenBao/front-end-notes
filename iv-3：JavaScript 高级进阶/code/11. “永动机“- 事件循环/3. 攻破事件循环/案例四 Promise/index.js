
//第一个promise
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(3);
        return Promise.resolve(7);
    })
    .then((res) => {
        console.log(res);
    });

//第二个promise
Promise.resolve()
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(4);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    })
    .then(() => {
        console.log(8);
    });
