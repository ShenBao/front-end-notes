const array = [1, [1, , ,]];

const flat = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
    }, []);
};

console.log(flat(array))
