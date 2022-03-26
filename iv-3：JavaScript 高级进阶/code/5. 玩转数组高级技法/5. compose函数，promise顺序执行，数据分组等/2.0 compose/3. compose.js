function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  return funcs.reduce((a, b) => (...args) => b(a(...args)))
}

function discount(x) {
  console.log('discount')
  return x * 0.9
}
function reduce(x) {
  console.log('reduce')
  return x > 200 ? x - 50 : x
}
function discountPlus(x) {
  console.log('discountPlus')
  return x * 0.95
}
const getPrice = compose(discount, reduce, discountPlus );

const print = console.log;

print(getPrice(200))
print(getPrice(250))