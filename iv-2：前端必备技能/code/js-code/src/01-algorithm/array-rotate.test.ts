/**
 * @description Array rotate test
 * @author 尘墨
 */

import { rotate1, rotate2 } from './array-rotate'

describe('数组旋转', () => {
    it('正常情况', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 3

        const res = rotate2(arr, k)
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]) // 断言
    })

    it('数组为空', () => {
        const res = rotate2([], 3)
        expect(res).toEqual([]) // 断言
    })

    it('k 是负值', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = -3

        const res = rotate2(arr, k)
        expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]) // 断言
    })

    it('k 是 0',  () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 0

        const res = rotate2(arr, k)
        expect(res).toEqual(arr) // 断言
    })

    it('k 不是数字', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7]
        const k = 'abc'

        // @ts-ignore
        const res = rotate2(arr, k)
        expect(res).toEqual(arr) // 断言
    })
})
