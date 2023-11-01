function createData() {
    return new Array(1000).fill(null)
        .map((v, i) => ({ name: `name${i + 1}` }))
}

const data = createData();
console.log(data);


