请用递归的方式遍历树形数据结构中的每一个节点

```js
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
];

function traversal(data, callback) {
    if (data instanceof Array) {
        let dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
            typeof callback === 'function' && callback(data[i]);
            traversal(data[i].children, callback);
        }
    }
}

traversal(options, (node) => {
    console.log(`value:${node.value}, label: ${node.label}`);
});
```


实现一个jsonp函数，仅需要支持jsonp(url)一种调用方式即可（仅有url一个传参），例如： jsonp('//cdn.com/t/gettime?callback=cb').then(result=>console.dir(result))


```js
//需使用promise
function jsonp(url) {

    function createScript(url) {
        let script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        script.async = true;
        return script;
    };

    function getUrlParam(url, paramName) {
        let arrObj = url.split("?");
        if (arrObj.length > 1) {
            let arrParam = arrObj[1].split("&");
            let arr;
            for (let i = 0; i < arrParam.length; i++) {
                arr = arrParam[i].split("=");
                if (arr != null && arr[0] == paramName) {
                    return arr[1];
                }
            }
            return "";
        } else {
            return "";
        }
    }

    let callbackName = getUrlParam(url, 'callback');
    let promise = new Promise(function (resolve, reject) {
        window[callbackName] = function () {
            if (resolve) {
                resolve(arguments[0]);
            }
        };
        let script = createScript(url);
        script.onload = script.onreadystatechange = function () {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                window[callbackName] = null;
            }
        };
        script.onerror = function (err) {
            if (reject) {
                reject(err);
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    });

    return promise;
};

jsonp('http://cdn.com/t/gettime?callback=callbackFn')
    .then(
        (result) => {
            console.log(result);
            return JSON.stringify(result);
        }, (err) => {
            console.log(err);
        }
    ).then(
        (result) => {
            console.log('JSON.stringify：' + result);
        }
    );
```
