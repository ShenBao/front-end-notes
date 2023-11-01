// for(var i=0;i<5;i++){
//     setTimeout(function(){console.log(i)},i*1000);
// }



for (var i = 0; i < 5; i++) {
    setTimeout((function (i) {
        console.log(i)
    }(i)), i * 1000);
}


for (var i = 0; i < 5; i++) {
    setTimeout(console.log, i * 1000,i);
}