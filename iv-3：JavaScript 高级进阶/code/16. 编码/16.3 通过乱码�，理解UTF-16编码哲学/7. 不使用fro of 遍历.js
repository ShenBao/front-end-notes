

function strForEach(str, callback) {
  var code;
  var skip;
  var index = 0;
  for (var i = 0; i < str.length; i++) {
    if (skip) {
      skip = false;
      continue;
    }
    code = str.codePointAt(i);
    callback(String.fromCodePoint(+`0x${code.toString(16)}`), index, str);
    index++;
    //我们知道如果码点大于0xffff的下一个索引值的值，是不可用的。我们直接跳过就好。
    if (code > 0xffff) {
      skip = true;
    }
  }
}

var text = "𢂘a𠮷人";
// 𢂘，𠮷码点大于65535, 都占两个码元
console.log("text.length:", text.length);
strForEach(text, function (ch, index, str) {
  console.log(ch, index, str);
});

for(i = 0 ; i< text.length; i++){
  console.log(text[i], i);
}
