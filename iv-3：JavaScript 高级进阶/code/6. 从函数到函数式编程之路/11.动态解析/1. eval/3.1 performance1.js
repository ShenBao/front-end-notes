
const count = 100000;

function test() {
    console.time("sum")
    const sum = function sum(a, b) {
        return a + b
    }
    for (let i = 0; i < count; i++) {
        sum(i, i + 1)
    }

    console.timeEnd("sum")
}

test();
