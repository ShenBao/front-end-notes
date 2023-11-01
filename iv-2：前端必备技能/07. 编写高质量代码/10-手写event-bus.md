# 手写 EventBus

Bus 不是“车”，而是“总线”

## 题目

请手写 EventBus 自定义事件，实现 `no` `once` `emit` 和 `off`

## EventBus 功能

```js
const event = new EventBus()

function fn1(a, b) { console.log('fn1', a, b) }
function fn2(a, b) { console.log('fn2', a, b) }
function fn3(a, b) { console.log('fn3', a, b) }

event.on('key1', fn1)
event.on('key1', fn2)
event.once('key1', fn3)
event.on('xxxxxx', fn3)

event.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

event.off('key1', fn1)

event.emit('key1', 100, 200) // 触发 fn2
```

## 分析

- on 和 once 注册函数，存储起来
- emit 时找到对应的函数，执行
- off 找到对应的函数，从对象中删除

## 实现

- `class` 结构
- 注意区分 `on` 和 `once`
- on 绑定的事件可以连续执行，除非 off
- once 绑定的函数 emit 一次即可，也可以未执行而被 off
- 在数据结构上标识出 once

代码参考 event-bus.ts

```ts
export default class EventBus {
    /**
     * {
     *    'key1': [
     *        { fn: fn1, isOnce: false },
     *        { fn: fn2, isOnce: false },
     *        { fn: fn3, isOnce: true },
     *    ]
     *    'key2': [] // 有序
     *    'key3': []
     * }
     */
    private events: {
        [key: string]: Array<{fn: Function; isOnce: boolean}>
    }

    constructor() {
        this.events = {}
    }

    on(type: string, fn: Function, isOnce: boolean = false) {
        const events = this.events
        if (events[type] == null) {
            events[type] = [] // 初始化 key 的 fn 数组
        }
        events[type].push({ fn, isOnce })
    }

    once(type: string, fn: Function) {
        this.on(type, fn, true)
    }

    off(type: string, fn?: Function) {
        if (!fn) {
            // 解绑所有 type 的函数
            this.events[type] = []
        } else {
            // 解绑单个 fn
            const fnList = this.events[type]
            if (fnList) {
                this.events[type] = fnList.filter(item => item.fn !== fn)
            }
        }
    }

    emit(type: string, ...args: any[]) {
        const fnList = this.events[type]
        if (fnList == null) return

        // 注意
        this.events[type] = fnList.filter(item => {
            const { fn, isOnce } = item
            fn(...args)

            // once 执行一次就要被过滤掉
            if (!isOnce) return true
            return false
        })
    }
}
```

## 连环问：EventBus 里的数组可以换成 Set 吗？

数组和 Set 比较 （除了语法 API）
- 数组，有序结构，查找、中间插入、中间删除比较慢
- Set 不可排序的，插入和删除都很快

Set 初始化或者 `add` 时是一个有序结构，但它无法再次排序，没有 `index` 也没有 `sort` 等 API 

验证
- 生成一个大数组，验证 `push` `unshift` `includes` `splice`
- 生成一个大 Set ，验证 `add` `delete` `has`

答案：不可以，Set 是不可排序的，如再增加一些“权重”之类的需求，将不好实现。

## Map 和 Object

Object 是无序的

```js
const data1 = {'1':'aaa','2':'bbb','3':'ccc','测试':'000'}
Object.keys(data1) // ["1", "2", "3", "测试"]
const data2 = {'测试':'000','1':'aaa','3':'ccc','2':'bbb'};
Object.keys(data2); // ["1", "2", "3", "测试"]
```

Map 是有序的

```js
const m1 = new Map([
    ['1', 'aaa'],
    ['2', 'bbb'],
    ['3', 'ccc'],
    ['测试', '000']
])
m1.forEach((val, key) => { console.log(key, val) })
const m2 = new Map([
    ['测试', '000'],
    ['1', 'aaa'],
    ['3', 'ccc'],
    ['2', 'bbb']
])
m2.forEach((val, key) => { console.log(key, val) })
```

另外，**Map 虽然是有序的，但它的 `get` `set` `delete` 速度非常快**，和 Object 效率一样。它是被优化过的有序结构。
