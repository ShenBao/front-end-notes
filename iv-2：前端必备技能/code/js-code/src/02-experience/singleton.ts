/**
 * @description 单例模式
 * @author 尘墨
 */

class SingleTon {
    private static instance: SingleTon | null = null
    private constructor() {}
    public static getInstance(): SingleTon {
        if (this.instance == null) {
            this.instance = new SingleTon()
        }
        return this.instance
    }
    fn1() {}
    fn2() {}
}

const s = SingleTon.getInstance()
s.fn1()
s.fn2()

const s1 = SingleTon.getInstance()
const s2 = SingleTon.getInstance()

console.info(s1 === s2)