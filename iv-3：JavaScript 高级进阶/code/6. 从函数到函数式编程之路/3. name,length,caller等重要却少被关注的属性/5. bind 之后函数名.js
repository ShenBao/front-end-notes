function sum(num1, num2) {
    console.log("this", this)
    return num1 + num2;
}

const sumBound = sum.bind({a:1}).bind({b:1})
sumBound(1, 2);
console.log("sumBound.name:", sumBound.name);