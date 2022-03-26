var obj = {};

obj.p1 = "p1";
obj[1] = 'p1';

obj.p6 = "p6";
obj[6] = 'p6';

obj.p2 = "p2";
obj[2] = 'p2';

for (var p in obj) {
    console.log("property:", p)
}