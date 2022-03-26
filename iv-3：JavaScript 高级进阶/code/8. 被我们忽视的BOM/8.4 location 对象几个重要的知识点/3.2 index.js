btnHref.onclick = function () {
    window.location.href = "https://www.imooc.com/";
}
btnAssign.onclick = function () {
    console.log("document.domain:", document.domain)
    // window.location.assign("https://www.imooc.com/");
}
btnReplace.onclick = function () {
    window.location.replace("https://www.imooc.com/");
}