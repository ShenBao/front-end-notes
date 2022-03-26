const obj = {},
    objA = { propertyA: 'A', toString() { return "objA" } },
    objB = { propertyB: 'B', valueOf() { return "objB" } };

obj[objA] = 'objectA'
obj[objB] = 'ObjectB';

for (let [p, v] of Object.entries(obj)) {
    console.log('p:', p, ', v:', v);
}