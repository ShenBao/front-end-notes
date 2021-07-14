
// nodejs 事件循环机制

setTimeout(() => {
    console.log("setTimeout");
}, 0);

setImmediate(() => {
    console.log("setImmediate");
}, 0);

process.nextTick(() => {
    console.log("process.nextTick");
});

// process.nextTick
// setTimeout
// setImmediate


/**
 
nodejs 事件循环机制：借助 libuv 库实现的

概括事件轮训机制，分为6个阶段：
1 timers 定时器阶段
    计时和执行到点的定时器回调函数
2、pending callbacks
    借助系统操作（例如TCP错误类型）的回调函数
3. idle，prepare
    准备工作
4. poll 轮训阶段（轮训队列）
    如果轮训队列不为空，依次同步取出轮训队列中第一个回调函数执行，直到训练队列为空或者达到系统最大的限制
    如果轮训队列为空
        如果之前设置过 setImmediate 函数
            直接进入下一个 check 阶段
        如果之前没有设置过 setImmediate 函数
            在当前 poll 阶段等待
                直到轮训队列添加回调函数，就去第一个情况执行
                如果定时器到点了，也会去下一个阶段
5. check 查阶段
    执行 setImmediate 设置的回调函数
6. close callbacks 关闭阶段
    执行 close 事件回调函数

process.nextTick 能在任意阶段优先执行

 */


