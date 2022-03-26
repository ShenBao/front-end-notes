

var arrayLike = {
    length:2,
    0:1
}

console.log(Array.apply(null, arrayLike));