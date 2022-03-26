var obj = {};

obj["1"] = 'p1';
obj["6"] = 'p6';
obj["2"] = 'p2';

for (var p in obj) {
    console.log("property:", p)
}

// 0+数字
var obj2 = {};

obj2["01"] = 'p1';
obj2["06"] = 'p6';
obj2["02"] = 'p2';

for (var p in obj2) {
    console.log("property:", p)
}