console.log("index1.js:", new Date().toLocaleTimeString());

function sleep(time){
    const now = Date.now();
    while (Date.now() - now <= time) {
    }
}

sleep(3000)