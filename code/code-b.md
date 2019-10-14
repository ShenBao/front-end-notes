# code-b

格式化日期
```js
function getTimeFormat(time, format) {
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ?
            '0' :
            '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}
getTimeFormat(Date.now(), 'yyyy|MM|dd|HH|mm|ss')
```


深度克隆
```js
function deepClone(data) {
    var obj = {};
    var originQueue = [data];
    var copyQueue = [obj];
    var visitQueue = [];
    var copyVisitQueue = [];
    while (originQueue.length > 0) {
        var _data = originQueue.shift();
        var _obj = copyQueue.shift();
        visitQueue.push(_data);
        copyVisitQueue.push(_obj);
        for (var key in _data) {
            var _value = _data[key]
            if (typeof _value !== 'object') {
                _obj[key] = _value;
            } else {
                var index = visitQueue.indexOf(_value);
                if (index >= 0) {
                    _obj[key] = copyVisitQueue[index];
                } else {
                    originQueue.push(_value);
                    _obj[key] = {};
                    copyQueue.push(_obj[key]);
                }
            }
        }
    }
    return obj;
}
```

给url添加参数
```js
let urlAddParams = (url, params) => {
    let newUrl = url;
    if (url.indexOf("?") == -1) {
        newUrl = url + '?';
    }
    if (url.indexOf("?") != -1 && !(url.endsWith('&'))) {
        newUrl = url + '&';
    }
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            newUrl = newUrl + key + '=' + params[key] + '&';
        }
    }
    return newUrl;
};


urlAddParams('http://url.com', {
    name: 'name',
    age: 18
})
```


获取url 指定参数
```js
function GetUrlParam(url, paraName) {
    var arrObj = url.split("?");

    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    } else {
        return "";
    }
}

GetUrlParam('http://url.com?name=name&age=18&', 'age')
```


UrlEncode\UrlDecode
```js
function str2asc(strstr) {
    return ("0" + strstr.charCodeAt(0).toString(16)).slice(-2);
}

function asc2str(ascasc) {
    return String.fromCharCode(ascasc);
}

function UrlEncode(str) {
    var ret = "";
    var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
    var tt = "";

    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        var c = str2asc(chr);
        tt += chr + ":" + c + "n";
        if (parseInt("0x" + c) > 0x7f) {
            ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);
        } else {
            if (chr == " ")
                ret += "+";
            else if (strSpecial.indexOf(chr) != -1)
                ret += "%" + c.toString(16);
            else
                ret += chr;
        }
    }
    return ret;
}

function UrlDecode(str) {
    var ret = "";
    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        if (chr == "+") {
            ret += " ";
        } else if (chr == "%") {
            var asc = str.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                ret += asc2str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
                i += 5;
            } else {
                ret += asc2str(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            ret += chr;
        }
    }
    return ret;
}
```