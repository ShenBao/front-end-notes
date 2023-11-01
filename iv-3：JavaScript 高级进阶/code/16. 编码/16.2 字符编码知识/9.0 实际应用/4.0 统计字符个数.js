const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function chCounts(str) {
    return str.replace(spRegexp, '_').length;
}

chCounts("𠀠")  // 1
"𠀠".length // 2

// ES6 
Array.from("𠀠").length; //1
[..."𠀠"].length  // 1