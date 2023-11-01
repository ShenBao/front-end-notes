const createValues = (creator, length = 10) => Array.from({length}, creator)

function createUser(v, index){
    return {
        name: `user-${index}`,
        age: Math.random() * 100 >> 0
    }
}

const users = createValues(createUser, 1000);
console.log("users:", users);