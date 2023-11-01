var obj = {};

obj[1] = 'p1';
obj[6] = 'p6';
obj[2] = 'p2';

for (var p in obj) {
    console.log("property:", p)
}
