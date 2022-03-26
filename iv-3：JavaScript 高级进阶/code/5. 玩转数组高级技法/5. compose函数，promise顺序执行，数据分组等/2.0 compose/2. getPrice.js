function discount(x) {
    return x * 0.9
}
function reduce(x) {
    return x > 200 ? x - 50 : x
}
function getPriceMethod(discount, reduce) {
    return function _getPrice(x) {
        return reduce(discount(x))
    }
}
const method = getPriceMethod(discount, reduce)

const print = console.log;

print(method(100))
print(method(250))


