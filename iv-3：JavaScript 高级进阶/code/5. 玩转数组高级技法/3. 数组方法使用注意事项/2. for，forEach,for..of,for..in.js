const array = [1, 2, , 3, 4, 5, 6, 7, 8];

array.test = "test";

for (let i = 0, len = array.length; i < len; i++) {
    if (array[i] === 4) {
        break;
    }
    console.log("for:", array[i]);
}

for (const item of array) {
    if (item === 4) {
        break;
    }
    console.log("for of:", item);
}

array.forEach((item, index, arr) => {
    console.log("forEach:", item, "==index==", index, "==arr==", arr);
    if (item === 4) return;
});

// item 为索引
for (const item in array) {
    if (item == 4) {
        break;
    }
    console.log("for in:", item);
}
