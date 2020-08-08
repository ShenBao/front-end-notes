# 常用的性能测量 APIs

计算方式：

1. DNS 解析耗时: domainLookupEnd - domainLookupStart
1. TCP 连接耗时: connectEnd - connectStart
1. SSL 安全连接耗时: connectEnd - secureConnectionStart
1. 网络请求耗时 (TTFB): responseStart - requestStart
1. 数据传输耗时: responseEnd - responseStart
1. DOM 解析耗时: domInteractive - responseEnd
1. 资源加载耗时: loadEventStart - domContentLoadedEventEnd
1. First Byte 时间: responseStart - domainLookupStart
1. 白屏时间: responseEnd - fetchStart
1. 首次可交互时间: domInteractive - fetchStart
1. DOM Ready 时间: domContentLoadEventEnd - fetchStart
1. 页面完全加载时间: loadEventStart - fetchStart
1. http 头部大小： transferSize - encodedBodySize
1. 重定向次数：performance.navigation.redirectCount
1. 重定向耗时: redirectEnd - redirectStart

```js
// 计算一些关键的性能指标
window.addEventListener('load', (event) => {
  // Time to Interactive 可交互时间
  let timing = performance.getEntriesByType('navigation')[0];
  console.log(timing.domInteractive);
  console.log(timing.fetchStart);
  let diff = timing.domInteractive - timing.fetchStart;
  console.log('TTI: ' + diff);
});
```

```js
// 观察长任务
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry);
  }
});
// 监听 long tasks
observer.observe({entryTypes: ['longtask']});
```

```js
// 见面可见性的状态监听
let vEvent = 'visibilitychange';
if (document.webkitHidden != undefined) {
  // webkit prefix detected
  vEvent = 'webkitvisibilitychange';
}

function visibilityChanged() {
  if (document.hidden || document.webkitHidden) {
    // 页面不可见
    console.log('Web page is hidden.');
  } else {
    //   页面可见
    console.log('Web page is visible.');
  }
}

document.addEventListener(vEvent, visibilityChanged, false);
```

```js
// 监听网络状态变化
var connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log(
    'Connection type changed from ' + type + ' to ' + connection.effectiveType
  );
  type = connection.effectiveType;
}

connection.addEventListener('change', updateConnectionStatus);
```
