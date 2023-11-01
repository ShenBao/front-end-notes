function discount(x) {
    return x * 0.9
}

function reduce(x) {
    return x > 200 ? x - 50 : x
}

const print = console.log
// 享受九折
print(reduce(discount(100)))
// 享受九折 + 满减
print(reduce(discount(250)))