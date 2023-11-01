function format_with_substring(number) {
    // 数字转字符串, 并按照 .分割
  var arr = (number + '').split('.');
  var int = arr[0] + '';
  var fraction = arr[1] || '';

  // 多余的位数
  var f = int.length % 3;
  // 获取多余的位数，f可能是0， 即r可能是空字符串
  var r = int.substring(0, f);
  // 每三位添加","和对应的字符
  for (var i = 0; i < Math.floor(int.length / 3); i++) {
      r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
  }

  //多余的位数，上面
  if (f === 0) {
      r = r.substring(1);
  }
  // 整数部分和小数部分拼接
  return r + (!!fraction ? "." + fraction : '');
}


const print = console.log;
print(format_with_substring(938765432.02));