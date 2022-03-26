function createData() {
    return Array.from({ length: 1000 }, (v, i) => (
        { name: `name${i + 1}` }
    ));
}

const data = createData();
console.log(data)