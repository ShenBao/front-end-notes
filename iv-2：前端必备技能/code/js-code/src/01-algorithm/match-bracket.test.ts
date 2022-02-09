/**
 * @description 括号匹配 test
 * @author 尘墨
 */

import { matchBracket } from './match-bracket'

describe('括号匹配', () => {
    it('正常情况', () => {
        const str = '{a(b[c]d)e}f'
        const res = matchBracket(str)
        expect(res).toBe(true)
    })

    it('不匹配', () => {
        const str = '{a(b[(c]d)e}f'
        const res = matchBracket(str)
        expect(res).toBe(false)
    })

    it('顺序不一致的', () => {
        const str = '{a(b[c]d}e)f'
        const res = matchBracket(str)
        expect(res).toBe(false)
    })

    it('空字符串', () => {
        const res = matchBracket('')
        expect(res).toBe(true)
    })
})
