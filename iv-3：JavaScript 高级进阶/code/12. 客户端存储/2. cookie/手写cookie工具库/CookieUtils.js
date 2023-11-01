/**
 *
 * 编码 -方便后续替换编解码方法
 * @param {any} s
 * @returns
 */
function encode(s) {
  return encodeURIComponent(s);
}
/**
 *
 * 解码-方便后续替换编解码方法
 * @param {any} s
 * @returns
 */
function decode(s) {
  return decodeURIComponent(s);
}

/**
 *
 * 获取cookie
 * @param {any} key
 * @returns
 */
function getCookieItem(key) {
  let result = key ? undefined : {},
    cookies = document.cookie ? document.cookie.split("; ") : [],
    i = 0,
    l = cookies.length;
  for (; i < l; i++) {
    let parts = cookies[i].split("="),
      //取第一个等号前面的作为key
      name = decode(parts.shift()),
      cookie = parts.join("=");

    if (key === name) {
      result = decode(cookie);
      break;
    }

    if (!key && cookie !== undefined) {
      //key 未定义，返回全部的key和value对象
      result[name] = decode(cookie);
    }
  }
  return result;
}

/**
 *
 * 设置cookie
 * @param {any} key
 * @param {any} value
 * @param {any} [options={}]
 * @returns
 */
function setCookieItem(key, value, options = {}) {
  if (!key) return false;
  console.log(options);

  let sExpires = "";
  if (options.expires) {
    switch (options.expires.constructor) {
      case Number:
        sExpires =
          options.expires === Infinity
            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
            : "; max-age=" + options.expires;
        break;
      case String:
        sExpires = "; expires=" + options.expires;
        break;
      case Date:
        sExpires = "; expires=" + options.expires.toUTCString();
        break;
    }
  }

  window.document.cookie = [
    encode(key),
    "=",
    encode(value),
    sExpires,
    options.path ? "; path=" + options.path : "",
    options.domain ? "; domain=" + options.domain : "",
    options.secure ? "; secure" : "",
  ].join("");
  return true;
}

/**
 *
 * 移除单个cookie字段
 * @param {any} key
 * @param {any} options
 * @returns
 */
function removeCookieItem(key, options) {
  setCookieItem(key, "", { ...options, expires: -1 });
  return !getCookieItem(key);
}
