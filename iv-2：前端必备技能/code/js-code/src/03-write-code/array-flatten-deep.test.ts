/**
 * @description 数组深度扁平化 test
 * @author 尘墨
 */

import { flattenDeep1, flattenDeep2 } from './array-flatten-deep'

describe('数组深度扁平化', () => {
    it('空数组', () => {
        const res = flattenDeep2([])
        expect(res).toEqual([])
    })

    it('非嵌套数组', () => {
        const arr = [1, 2, 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 3])
    })

    it('一级嵌套', () => {
        const arr = [1, 2, [10, 20], 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 10, 20, 3])
    })

    it('二级嵌套', () => {
        const arr = [1, 2, [10, [100, 200], 20], 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 10, 100, 200, 20, 3])
    })

    it('三级嵌套', () => {
        const arr = [1, 2, [10, [100, ['a', [true],'b'], 200], 20], 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 10, 100, 'a', true, 'b', 200, 20, 3])
    })
})
