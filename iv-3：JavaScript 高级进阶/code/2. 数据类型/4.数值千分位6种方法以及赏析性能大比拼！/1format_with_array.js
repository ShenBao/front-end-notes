function format_with_array(number) {
    // 转为字符串，并按照.拆分
  var arr = (number + '').split('.');
    // 整数部分再拆分
  var int = arr[0].split('');
    // 小数部分
  var fraction = arr[1] || '';
    // 返回的变量
  var r = "";
  var len = int.length;
    // 倒叙并遍历
  int.reverse().forEach(function (v, i) {
        // 非第一位并且是位值是3的倍数， 添加 ","
      if (i !== 0 && i % 3 === 0) {
          r = v + "," + r;
      } else {
            // 正常添加字符
          r = v + r;
      }
  })
    // 整数部分和小数部分拼接
  return r + (!!fraction ? "." + fraction : '');
}

const print = console.log;
print(format_with_array(938765432.02));


938765432.02



