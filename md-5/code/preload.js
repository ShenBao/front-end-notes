// 使用XMLHttpRequest对象

var xmlhttprequest = new XMLHttpRequest();

xmlhttprequest.onreadystatechange = callback;

xmlhttprequest.onprogress = progressCallback;

xmlhttprequest.open('GET', 'http://xxx.xxx.jpg', true);

xmlhttprequest.send();

function callback() {
    if (xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200) {
        var responseText = xmlhttprequest.responseText;
    } else {
        console.log('Request was unsuccessful:' + xmlhttprequest.status);
    }
}

function progressCallback(e) {
    e = e || event;
    if (e.lengthComputable) {
        console.log('Received' + e.loaded + 'of' + e.total + 'bytes');
    }
}