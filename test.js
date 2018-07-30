

var arr = [1, 2, 3];
arr.forEach(function (item, index) {
    console.log(index, item);
})

var obj = {
    x: 100,
    y: 200,
    z: 300
}
var key;
for (key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key, obj[key]);
    }
}


function forEach(obj, fn) {
    var key;
    if (obj instanceof Array) {
        obj.forEach(function (item, index) {
            fn(item, index);
        })
    } else {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(key, obj[key]);
            }
        }
    }
}

var arr = [1, 2, 3];
var obj = {
    x: 100,
    y: 200,
    z: 300
};
forEach(arr, function (item, index) {
    console.log(index, item);
});
forEach(obj, function (key, val) {
    console.log(key, val);
});




