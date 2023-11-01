
var a = 1;
function test() {
    console.log(a);
}
function test1() {
    var a = 2;
    test();
}
test1() 