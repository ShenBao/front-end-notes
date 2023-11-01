

console.log(escape(" ") )        //%20
console.log(encodeURI(" "))    //%20

console.log(escape("人"));       // "%u4EBA" 
console.log(encodeURI("人"));    // "%E4%BA%BA"

console.log(escape("𣑕"));       //  %uD84D%uDC55
console.log(encodeURI("𣑕"));    //  "%F0%A3%91%95"
