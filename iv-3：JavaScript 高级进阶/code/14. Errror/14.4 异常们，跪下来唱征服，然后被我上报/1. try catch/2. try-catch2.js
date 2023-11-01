//编译时错误，还没有执行到try catch
try {
    dd.
} catch (e) {
    console.log("捕捉到错误", e.message);
}

//try catch 执行时
try {
    var a = {};
    a.b();
} catch (e) {
    console.log("捕捉到错误", e.message);
}


//try catch已经执行完毕,无法捕获
try {
    setTimeout(() => {
        var a = {};
        a.b();
    })
} catch (e) {
    console.log("捕捉到错误", e.message);
}