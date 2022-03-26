function sum(num1, num2) {
    console.log("caller:", sum.caller);
    return num1 + num2;
}

sum(1, 2);

function doSum() {
    sum(1, 2)
}

doSum();
