/**
 * @description EventBus 自定义事件 - test
 * @author 尘墨
 */

import EventBus from './event-bus-split-on-once'

describe('EventBus 自定义事件', () => {
    it('绑定事件，触发事件', () => {
        const event = new EventBus()

        // 注意
        const fn1 = jest.fn() // jest mock function
        const fn2 = jest.fn()
        const fn3 = jest.fn()

        event.on('key1', fn1)
        event.on('key1', fn2)
        event.on('xxxx', fn3)

        event.emit('key1', 10, 20)

        expect(fn1).toBeCalledWith(10, 20)
        expect(fn2).toBeCalledWith(10, 20)
        expect(fn3).not.toBeCalled()
    })

    it('解绑单个事件', () => {
        const event = new EventBus()

        const fn1 = jest.fn()
        const fn2 = jest.fn()

        event.on('key1', fn1)
        event.on('key1', fn2)

        event.off('key1', fn1)

        event.emit('key1', 10, 20)

        expect(fn1).not.toBeCalled()
        expect(fn2).toBeCalledWith(10, 20)
    })

    it('解绑所有事件', () => {
        const event = new EventBus()

        const fn1 = jest.fn()
        const fn2 = jest.fn()

        event.on('key1', fn1)
        event.on('key1', fn2)

        event.off('key1') // 解绑所有事件

        event.emit('key1', 10, 20)

        expect(fn1).not.toBeCalled()
        expect(fn2).not.toBeCalled()
    })

    it('once', () => {
        const event = new EventBus()

        let n = 1

        const fn1 = jest.fn(() => n++)
        const fn2 = jest.fn(() => n++)

        event.once('key1', fn1)
        event.once('key1', fn2)

        // 无论 emit 多少次，只有一次生效
        event.emit('key1')
        event.emit('key1')
        event.emit('key1')
        event.emit('key1')
        event.emit('key1')

        expect(n).toBe(3)
    })
})
