/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
 const fromUint8Array = (u8a: Uint8Array, urlsafe = false) =>
 urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c: string) => {
 if (c.length < 2) {
     var cc = c.charCodeAt(0);
     return cc < 0x80 ? c
         : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
             + _fromCC(0x80 | (cc & 0x3f)))
             : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                 + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                 + _fromCC(0x80 | (cc & 0x3f)));
 } else {
     var cc = 0x10000
         + (c.charCodeAt(0) - 0xD800) * 0x400
         + (c.charCodeAt(1) - 0xDC00);
     return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
         + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
         + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
         + _fromCC(0x80 | (cc & 0x3f)));
 }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
* @deprecated should have been internal use only.
* @param {string} src UTF-8 string
* @returns {string} UTF-16 string
*/
const utob = (u: string) => u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer
 ? (s: string) => Buffer.from(s, 'utf8').toString('base64')
 : _TE
     ? (s: string) => _fromUint8Array(_TE.encode(s))
     : (s: string) => _btoa(utob(s));
/**
* converts a UTF-8-encoded string to a Base64 string.
* @param {boolean} [urlsafe] if `true` make the result URL-safe
* @returns {string} Base64 string
*/
const encode = (src: string, urlsafe = false) => urlsafe
 ? _mkUriSafe(_encode(src))
 : _encode(src);
/**
* converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
* @returns {string} Base64 string
*/
const encodeURI = (src: string) => encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc: string) => {
 switch (cccc.length) {
     case 4:
         var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
             | ((0x3f & cccc.charCodeAt(1)) << 12)
             | ((0x3f & cccc.charCodeAt(2)) << 6)
             | (0x3f & cccc.charCodeAt(3)),
             offset = cp - 0x10000;
         return (_fromCC((offset >>> 10) + 0xD800)
             + _fromCC((offset & 0x3FF) + 0xDC00));
     case 3:
         return _fromCC(
             ((0x0f & cccc.charCodeAt(0)) << 12)
             | ((0x3f & cccc.charCodeAt(1)) << 6)
             | (0x3f & cccc.charCodeAt(2))
         );
     default:
         return _fromCC(
             ((0x1f & cccc.charCodeAt(0)) << 6)
             | (0x3f & cccc.charCodeAt(1))
         );
 }
};