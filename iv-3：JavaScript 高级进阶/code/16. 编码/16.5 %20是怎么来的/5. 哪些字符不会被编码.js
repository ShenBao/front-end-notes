

// @ * _ + - . /                                    escape
// - _ . ! ~ * ' ( ) ; , / ? : @ & = + $ #          encodeURI
// - _ . ! ~ * ' ( )                                encodeURIComponent
// A-Z a-z 0-9                                      三者共有
var ch1 = "?";  
const str1=escape(ch1);
console.log("escape编码后:",str1); 
console.log("unescape解码后",unescape(escape(ch1)));

console.log("---------------------------------------");

const str2=encodeURI(ch1);

console.log("encodeURI编码后",str2); 
console.log("decodeURI解码后",decodeURI(str2));

console.log("---------------------------------------");

const str3=encodeURIComponent(ch1);
console.log("encodeURI编码后:",str3); 
console.log("decodeURI解码后:",decodeURIComponent(str3));

console.log(escape("𣑕"));                         //   %uD84D%uDC55
console.log("𣑕".charCodeAt(0).toString(16))       //     d84d
console.log("𣑕".charCodeAt(1).toString(16))       //           dc55


