/**
 * @description 自定义 call apply
 * @author 尘墨
 */

import './call-apply'

describe('自定义 call', () => {
    it('绑定 this - 对象', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res = fn.customCall({x: 100})
        expect(res).toEqual({x: 100})
    })
    it('绑定 this - 值类型', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res1 = fn.customCall('abc')
        expect(res1.toString()).toBe('abc')

        // @ts-ignore
        const res1 = fn.customCall(null)
        expect(res1).not.toBeNull()
    })
    it('绑定参数', () => {
        function fn(a: number, b: number) {
            return a + b
        }
        // @ts-ignore
        const res = fn.customCall(null, 10, 20)
        expect(res).toBe(30)
    })
})

describe('自定义 apply', () => {
    it('绑定 this - 对象', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res = fn.customApply({x: 100})
        expect(res).toEqual({x: 100})
    })
    it('绑定 this - 值类型', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res1 = fn.customApply('abc')
        expect(res1.toString()).toBe('abc')

        // @ts-ignore
        const res1 = fn.customApply(null)
        expect(res1).not.toBeNull()
    })
    it('绑定参数', () => {
        function fn(a: number, b: number) {
            return a + b
        }
        // @ts-ignore
        const res = fn.customApply(null, [10, 20])
        expect(res).toBe(30)
    })
})
