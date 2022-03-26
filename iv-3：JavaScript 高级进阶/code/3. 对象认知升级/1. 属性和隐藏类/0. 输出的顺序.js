

var obj = {};

obj.p1 = "str1";
obj.p6 = "str6";
obj.p2 = "str2";

obj[1] = 'num1';
obj[6] = 'num6';
obj[2] = 'num2';

for (var p in obj) {
    console.log("property:", obj[p])
}