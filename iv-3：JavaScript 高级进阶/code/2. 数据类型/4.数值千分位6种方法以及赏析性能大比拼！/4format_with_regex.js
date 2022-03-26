function format_with_regex(number) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (number + '').replace(reg, '$&,');
}

// 987, 654, 321

// const print = console.log;
// print(format_with_regex(987654321));

function format_with_regex(number) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (number + '').replace(reg, function(match, ...args){    
      console.log(match, ...args);
      return match + ','
    });
}
format_with_regex(987654321)



// function format_with_regex(number) {
//     var reg = /(\d)(?=(?:\d{3})+$)/g
//     return (number + '').replace(reg, '$1,');
// }
