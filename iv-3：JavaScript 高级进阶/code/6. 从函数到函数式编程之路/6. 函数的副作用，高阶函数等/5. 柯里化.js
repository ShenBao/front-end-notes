function curryingAdd(num1) {
    return function (num2) {
        return num1 + num2
    }
}