function createObjectsFromSNumProps(counts = 100000) {
    var arr = [];
    for (let i = 0; i < counts; i++) {
        arr.push({
            0: `value-${i}`,
            1: `value-${i}`,
            2: `value-${i}`,
            3: `value-${i}`,
            4: `value-${i}`,
            5: `value-${i}`,
            6: `value-${i}`,
            7: `value-${i}`,
            8: `value-${i}`,
            9: `value-${i}`,
            10: `value-${i}`,
            11: `value-${i}`,
            12: `value-${i}`,
            13: `value-${i}`,
            14: `value-${i}`,
            15: `value-${i}`,
            16: `value-${i}`,
            17: `value-${i}`,
            18: `value-${i}`,
            19: `value-${i}`,
            20: `value-${i}`,
            21: `value-${i}`,
            22: `value-${i}`,
            23: `value-${i}`,
            24: `value-${i}`
        });
    }
    return arr;
}

const arr = createObjectsFromSNumProps();
const arr2 = createObjectsFromSNumProps();

console.time("set");
for (let i = 0; i < arr2.length; i++) {
    const rd = i % 25;
    arr2[i][rd] = undefined;

}
console.timeEnd("set");

console.time("del");
for (let i = 0; i < arr.length; i++) {
    const rd = i % 25;
    delete arr[i][rd]
}
console.timeEnd("del");

