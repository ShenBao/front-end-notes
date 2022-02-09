/**
 * @description 数字千分位格式化
 * @author 尘墨
 */

import { format1, format2 } from './thousands-format'

describe('数组千分位格式化', () => {
    it('正常', () => {
        const n = 10201004050
        const res = format2(n)
        expect(res).toBe('10,201,004,050')
    })
    it('小于 1000', () => {
        expect(format2(0)).toBe('0')
        expect(format2(10)).toBe('10')
    })
})