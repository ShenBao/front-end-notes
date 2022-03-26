var rate = 1;
function sum(sum1, sum2) {
    rate = 2;
    return sum1 + sum2
}

var log = console.log;
log("rate:", rate);
sum(1, 2);
log("rate:", rate);