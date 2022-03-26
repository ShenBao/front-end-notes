function createObjectsFromStrProps(counts = 100000) {
    var arr = [];
    for (let i = 0; i < counts; i++) {
        arr.push({
            "p0": `value-${i}`,
            "p1": `value-${i}`,
            "p2": `value-${i}`,
            "p3": `value-${i}`,
            "p4": `value-${i}`,
            "p5": `value-${i}`,
            "p6": `value-${i}`,
            "p7": `value-${i}`,
            "p8": `value-${i}`,
            "p9": `value-${i}`,
            "p10": `value-${i}`,
            "p11": `value-${i}`,
            "p12": `value-${i}`,
            "p13": `value-${i}`,
            "p14": `value-${i}`,
            "p15": `value-${i}`,
            "p16": `value-${i}`,
            "p17": `value-${i}`,
            "p18": `value-${i}`,
            "p19": `value-${i}`,
            "p20": `value-${i}`,
            "p21": `value-${i}`,
            "p22": `value-${i}`,
            "p23": `value-${i}`,
            "p24": `value-${i}`
        });
    }
    return arr;
}

const arr = createObjectsFromStrProps();
const arr2 = createObjectsFromStrProps();

console.time("del");
for (let i = 0; i < arr.length; i++) {

    const rd = i % 25;
    delete arr[i][`p${rd}`]

}
console.timeEnd("del");

console.time("set");
for (let i = 0; i < arr2.length; i++) {
    const rd = i % 25;
    arr2[i][`p${rd}`] = undefined;

}
console.timeEnd("set");