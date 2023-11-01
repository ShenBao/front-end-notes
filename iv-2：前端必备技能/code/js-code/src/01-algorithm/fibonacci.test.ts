/**
 * @description 斐波那契数列 test
 * @author 尘墨
 */

import { fibonacci } from './fibonacci'

describe('斐波那契数列', () => {
    it('0 和 1', () => {
        expect(fibonacci(0)).toBe(0)
        expect(fibonacci(1)).toBe(1)
    })
    it('正常情况', () => {
        expect(fibonacci(2)).toBe(1)
        expect(fibonacci(3)).toBe(2)
        expect(fibonacci(6)).toBe(8)
    })
    it('n 小于 0', () => {
        expect(fibonacci(-1)).toBe(0)
    })
})
