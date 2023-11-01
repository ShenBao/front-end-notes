
function sum1(num1) {
    function sum2(num2) {
        debugger
        const r = sum3(num2)
        debugger;
        return r
    }

    function sum3(num3) {
        debugger
        const r = sum4(num3)
        debugger;
        return r
    }

    function sum4(num4) {
        debugger
        const r = sum5(num4)
        debugger;
        return r
    }

    function sum5(num5) {
        debugger
        return num5
    }

    return sum2(num1)
}

sum1(1);

