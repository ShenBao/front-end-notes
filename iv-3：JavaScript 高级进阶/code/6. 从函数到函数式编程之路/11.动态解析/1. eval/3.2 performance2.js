const count = 1000000;
function test() {
    console.time("sum")
    for (let i = 0; i < count; i++) {
        i + i + 1
    }
    console.timeEnd("sum")
}


function test2() {
    console.time("sum2")
    for (let i = 0; i < count; i++) {
        eval(`i + i + 1`)
    }
    console.timeEnd("sum2")
}

test();
test2();