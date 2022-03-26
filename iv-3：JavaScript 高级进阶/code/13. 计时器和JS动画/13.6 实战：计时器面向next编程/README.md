## nextGenerator
面向next编程思想，封装下一次的调用逻辑，比较经典的场景就是`setTimeout`,`requestAnimationFrame`。

调用`next`即进入下一个周期。

## 代码示例

### setTimeout 
下面代码：
每秒调用一次回调函数， 5次后，取消调用。
```js
const nextFactory = createTimeoutGenerator();

let context = {
    val: 0
};

let count = 0;

nextFactory.start(function (this: any, next, ...args: any[]) {

    count++;

    console.log("time:", Date.now());
    console.log("this:", this);
    console.log("args:", ...args);
    console.log(" ");
    context.val = count;

    if(count === 5){
       nextFactory.cancel();
    }

    if (count < 10) {
        // next(context, "param1-" + count, "param2-" + count);
        next(context, "param1-" + count, "param2-" + count);
    }

}, context, "param1", "param2")
```