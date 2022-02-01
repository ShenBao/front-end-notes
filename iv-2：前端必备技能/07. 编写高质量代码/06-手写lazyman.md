# 手写 LazyMan

## 题目

手写 LazyMan ，实现 `sleep` 和 `eat` 两个方法，支持链式调用。
代码示例：

```js
const me = new LazyMan('尘墨')
me.eat('苹果').eat('香蕉').sleep(5).eat('葡萄') // 打印结果如下：

// '尘墨 eat 苹果'
// '尘墨 eat 香蕉'
// （等待 5s）
// '尘墨 eat 葡萄'
```

## 处理 sleep 逻辑

初始化一个任务队列，执行 `eat` 和 `sleep` 是都往队列插入一个函数。依次执行队列的任务，遇到 `sleep` 就延迟触发 `next` 。

- 由于有 sleep 功能，函数不能直接在调用时触发
- 初始化一个列表，把函数注册进去
- 由每个 item 触发 next 执行（遇到 sleep 则异步触发）

![](./img/sleep.png)

## 设计 class 框架

```js
class LazyMan {
    private name: string
    constructor(name: string) {
        this.name = name
    }
    eat(x: string) {
        // 打印 eat 行为

        return this // 支持链式调用
    }
    sleep(seconds: number) {
        // 等待 10s 的处理逻辑

        return this // 支持链式调用
    }
}
```

代码参考 lazy-man.ts

```ts
/**
 * @description lazy man
 * @author 尘墨
 */

class LazyMan {
    private name: string
    private tasks: Function[] = [] // 任务列表

    constructor(name: string) {
        this.name = name

        setTimeout(() => {
            this.next()
        })
    }

    private next() {
        const task = this.tasks.shift() // 取出当前 tasks 的第一个任务
        if (task) task()
    }

    eat(food: string) {
        const task = () => {
            console.info(`${this.name} eat ${food}`)
            this.next() // 立刻执行下一个任务
        }
        this.tasks.push(task)

        return this // 链式调用
    }

    sleep(seconds: number) {
        const task = () => {
            console.info(`${this.name} 开始睡觉`)
            setTimeout(() => {
                console.info(`${this.name} 已经睡完了 ${seconds}s，开始执行下一个任务`)
                this.next() // xx 秒之后再执行下一个任务
            }, seconds * 1000)
        }
        this.tasks.push(task)

        return this // 链式调用
    }
}

const me = new LazyMan('尘墨')
me.eat('苹果').eat('香蕉').sleep(2).eat('葡萄').eat('西瓜').sleep(2).eat('橘子')
```

## 总结

- 任务队列
- 链式调用
- 触发 next
- sleep 延迟触发
