let t1 = performance.now();
//打印时间
function printTime(count) {
    const now = performance.now();
    console.log(count,"==时间差：", now - t1);
    t1 = now;
}

setTimeout(() => {
    printTime(1);
    setTimeout(() => {
        printTime(2);
        setTimeout(() => {
            printTime(3);
            setTimeout(() => {
                printTime(4);
                setTimeout(() => {
                    printTime(5);
                    setTimeout(() => {
                        printTime(6);
                    }, 0);
                }, 0);
            }, 0);
        }, 0);
    }, 0);
}, 0);