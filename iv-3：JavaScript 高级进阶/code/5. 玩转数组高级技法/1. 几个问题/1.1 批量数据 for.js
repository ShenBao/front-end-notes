function createData() {
    const data = [];
    for (let i = 0; i < 1000; i++) {
        data.push({
            name: `name${i + 1}`
        })
    }
    return data
}

const data = createData();
console.log(data)