
console.log(" ".codePointAt(0).toString(16));      // 20
console.log(escape(" "));                          //   %20
console.log(escape("𣑕"));                         //   %uD84D%uDC55
console.log("𣑕".charCodeAt(0).toString(16))       //     d84d
console.log("𣑕".charCodeAt(1).toString(16))       //           dc55

