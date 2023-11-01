
// 浏览器中执行
var t0 = "t0";
function test(){
    var t1 = "t1";
    return function test2(){
        var t2 = "t2";
        let tt2 = "tt2"
        return function test3(){
              var t3 = "t3";
              eval('console.log(t3);debugger')
        }
    }   
}

test()()()