if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./serviceWorker.register.js', { scope: './' })
        .then(function (reg) {
            console.log(reg);
        }).catch(function (e) {
            console.log(e);
        });
} else {
    console.log('serviceWorker is not supported');
}