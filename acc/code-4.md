
js 动态跳转至某个HTML页面

```js
/**
 * js 动态跳转至某个HTML页面
 * @param {String} url
 * @param {Object} params
 * @param {String} method
 * @returns {Element}
 */
function myFrom(url, params, method) {
    var temp = document.createElement('form');
    temp.action = url;
    temp.method = method || 'GET';
    temp.style.display = 'none';
    for (var x in params) {
        var opt = document.createElement('textarea');
        opt.name = x;
        opt.value = params[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}
```






