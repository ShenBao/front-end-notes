function to_binary(str) {
  const string = str.replace(/\r\n/g, "\n");
  let result = "";
  let code;
  for (var n = 0; n < string.length; n++) {
    //获取码点
    code = str.charCodeAt(n);
    if (code < 0x007f) {
      // 1个字节
      // 0000 0000 ~ 0000 007F  0 ~ 127 1个字节

      // (code | 0b100000000).toString(2).slice(1)
      result += code.toString(2).padStart(8, "0");
    } else if (code > 0x0080 && code < 0x07ff) {
      // 0000 0080 ~ 0000 07FF	128 ~ 2047 2个字节
      // 0x0080 的二进制为 10000000 ，8位，所以大于0x0080的，至少有8位
      // 格式 110xxxxx 10xxxxxx

      // 高位 110xxxxx
      result += ((code >> 6) | 0b11000000).toString(2);
      // 低位 10xxxxxx
      result += ((code & 0b111111) | 0b10000000).toString(2);
    } else if (code > 0x0800 && code < 0xffff) {
      // 0000 0800 ~ 0000 FFFF	2048 ~ 65535	3个字节
      // 0x0800的二进制为 1000 00000000，12位，所以大于0x0800的，至少有12位
      // 格式 1110xxxx 10xxxxxx 10xxxxxx

      // 最高位 1110xxxx
      result += ((code >> 12) | 0b11100000).toString(2);
      // 第二位 10xxxxxx
      result += (((code >> 6) & 0b111111) | 0b10000000).toString(2);
      // 第三位 10xxxxxx
      result += ((code & 0b111111) | 0b10000000).toString(2);
    } else {
      // 0001 0000 ~ 0010 FFFF   65536 ~ 1114111   4个字节
      // https://www.unicode.org/charts/PDF/Unicode-13.0/U130-2F800.pdf
      throw new TypeError("暂不支持码点大于65535的字符");
    }
  }
  return result;
}

const BASE64_CHARTS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function utf8_to_base64(str) {
  let binaryStr = to_binary(str);
  const len = binaryStr.length;

  // 需要填补的=的数量
  let paddingCharLen = len % 24 !== 0 ? (24 - (len % 24)) / 8 : 0;

  //6个一组
  const groups = [];
  for (let i = 0; i < binaryStr.length; i += 6) {
    let g = binaryStr.slice(i, i + 6);
    if (g.length < 6) {
      g = g.padEnd(6, "0");
    }
    groups.push(g);
  }

  // 求值
  let base64Str = groups.reduce((b64str, cur) => {
    b64str += BASE64_CHARTS[+`0b${cur}`];
    return b64str;
  }, "");

  // 填充=
  if (paddingCharLen > 0) {
    base64Str += paddingCharLen > 1 ? "==" : "=";
  }

  return base64Str;
}

console.log(utf8_to_base64("a")); // YQ==

console.log(utf8_to_base64("Ȃ"));  // yII=

console.log(utf8_to_base64("中国人")); // 5Lit5Zu95Lq6

console.log(utf8_to_base64("Coding Writing 好文召集令｜后端、大前端双赛道投稿，2万元奖池等你挑战！"));
//Q29kaW5nIFdyaXRpbmcg5aW95paH5Y+s6ZuG5Luk772c5ZCO56uv44CB5aSn5YmN56uv5Y+M6LWb6YGT5oqV56i/77yMMuS4h+WFg+WlluaxoOetieS9oOaMkeaImO+8gQ==
