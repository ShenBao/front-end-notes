//https://coding.imooc.com/class/564.html?mc_marking=bb86c9071ed9b7cf12612a2a85203372&mc_channel=hk

var urlObj = new URL(window.location.href);
console.log("===", urlObj.searchParams);
console.log(urlObj.searchParams.get("mc_channel"));



