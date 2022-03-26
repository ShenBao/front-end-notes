
function* sequenceGenerator(start = 0, step = 1, end = Number.MAX_SAFE_INTEGER) {
  let current = start;
  while (current <= end) {
    yield current;
    current = current + step;
  }
}

// const gen = sequenceGenerator(0, 3, 6);
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());

const gen2= sequenceGenerator(0, 3, 6);
var numbers = [...gen2];
console.log(numbers);

const gen3= sequenceGenerator(0, 3, 6);
for(let v of gen3){
  console.log("v:", v);
}
