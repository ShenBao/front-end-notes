
function test2() {

    const count = 100000;
    const x = 1;
    const y = function () { };
    console.time("sum2")
    const sum2 = eval(`(function sum(a, b) {
        debugger;
        return a + b
    })`)
    for (let i = 0; i < count; i++) {
        sum2(i, i + 1)
    }
    console.timeEnd("sum2")
}
test2();
