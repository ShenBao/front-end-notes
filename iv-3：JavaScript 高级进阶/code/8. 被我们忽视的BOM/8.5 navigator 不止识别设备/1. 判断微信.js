//android
//mozilla/5.0 (linux; u; android 4.1.2; zh-cn; mi-one plus build/jzo54k) applewebkit/534.30 (khtml, like gecko) version/4.0 mobile safari/534.30 micromessenger/5.0.1.352

//ios
//mozilla/5.0 (iphone; cpu iphone os 5_1_1 like mac os x) applewebkit/534.46 (khtml, like gecko) mobile/9b206 micromessenger/5.0

function isWX() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
}

if ("serviceWorker" in navigator) {
    // Supported!
}
