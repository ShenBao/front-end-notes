const createValues = (creator, length = 10) => Array.from({ length }, creator);

function createUser(v, index) {
  return {
    name: `user-${index}`,
    age: (Math.random() * 100) >> 0,
  };
}

const users = createValues(createUser, 10);
const ages = users.map((u) => u.age);

const max = Math.max.apply(Math, ages);
const min = Math.min.apply(Math, ages);
console.log(ages);
console.log("max:", max + ",min:" + min);
