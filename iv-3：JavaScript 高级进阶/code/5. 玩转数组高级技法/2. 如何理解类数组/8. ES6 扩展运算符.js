// body.childNodes 浏览器
// [...document.body.childNodes]  // [div, script, script]

// arguments
function argumentsTest(){
    console.log([...arguments], arguments)
}
argumentsTest(1,2,3)