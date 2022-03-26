function sum(num1, num2) {
    "use strict";
    console.log("caller:", sum.caller.toString());
    return num1 + num2;
};

sum(1, 2);