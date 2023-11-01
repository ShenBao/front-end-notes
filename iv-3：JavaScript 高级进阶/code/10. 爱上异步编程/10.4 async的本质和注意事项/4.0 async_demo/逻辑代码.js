function* generator() {
    const r1 = yield 1;
    const r2 = yield 2;
    console.log("result:", r1 + r2);
}

const log = console.log;
const gen = generator();

var res = gen.next();           // {done: false, value:1}
// 传递r1回generator函数
var res2 = gen.next(res.value)  // {done: false, value:2}
// 传递r2回generator函数
var res3 = gen.next(res2.value) // {done: true, value: undefined}


