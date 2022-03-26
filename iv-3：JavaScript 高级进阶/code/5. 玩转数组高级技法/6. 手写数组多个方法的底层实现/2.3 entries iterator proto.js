
Array.prototype[Symbol.iterator] = function () {
    const O = Object(this);
    let index = 0;
    const length = O.length;

    function next() {
        if (index < length) {
            return { value: O[index++], done: false }
        }
        return { value: undefined, done: true };
    }

    return {
        next
    }
}

Array.prototype.entries = function () {
    const O = Object(this);
    const length = O.length;
    var entries = [];

    for (var i = 0; i < length; i++) {
        entries.push([i, O[i]]);
    }

    const itr = this[Symbol.iterator].bind(entries)();
    return {
        next: itr.next,
        [Symbol.iterator]() { return itr }
    }
}

Array.prototype.keys = function () {
    const O = Object(this);
    const length = O.length;
    var keys = [];

    for (var i = 0; i < length; i++) {
        keys.push([i]);
    }

    const itr = this[Symbol.iterator].bind(keys)();
    return {
        next: itr.next,
        [Symbol.iterator]() { return itr }
    }
}


const arr = [1, 2, 3];

var iter = arr.entries();
console.log("iter.next().value:", iter.next().value);
console.log("iter.next().value:", iter.next().value);
console.log("iter.next().value:", iter.next().value);

for (let [k, v] of arr.entries()) {
    console.log(`k:${k}`, `v:${v}`)
}

var iter = arr.keys();
console.log("iter.next().value:", iter.next().value);
console.log("iter.next().value:", iter.next().value);
console.log("iter.next().value:", iter.next().value);

for (let k of arr.keys()) {
    console.log(`k:${k}`)
}