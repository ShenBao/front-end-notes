
function* addGenerator(num1) {
    let num2 = 0
    while (true) {
       num2 = yield (num1 = num1 + num2)
    }
}
const gen = addGenerator(10);
// num1 = 10, num2 = 0 （第一次不能传参）
console.log(gen.next())    // 10
// num2 = 20, num1 = 10
console.log(gen.next(20))  // 30
// num2 = 30, num1 = 30
console.log(gen.next(30))  // 60


