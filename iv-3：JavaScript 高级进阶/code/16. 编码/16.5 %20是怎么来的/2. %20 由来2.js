

function to16Format(ch){
    return '%' + ch.codePointAt(0).toString(16)
}

console.log(to16Format(" "))  //  "%20"