// concat
const firstArray = [1, 2, 3, 4, 5];
const secondArray = [6, 7, 8, 9];
const result = firstArray.concat(secondArray);

console.log(result);

// every
const array = [
  { name: "freemen", age: 18 },
  { name: "vinko", age: 18 },
];
const result = array.every((item) => {
  return item.name === "freemen";
});
console.log(result);

// filter
const array = [
  { name: "freemen", age: 18 },
  { name: "vinko", age: 18 },
];
const result = array.filter((item) => {
  return item.name === "freemen";
});

console.log(result);

// forEach
const array = [
  { name: "freemen", age: 18 },
  { name: "vinko", age: 18 },
];

array.forEach((item, index) => {
  console.log(item);
  console.log(index);
});

// join
const array = [1, 2, 3, 4, 5];

const result = array.join(";");
console.log(result);

// indexOf
const array = [1, 2, 3, 4];
const result = array.indexOf(9);
console.log(result);

// lastIndexOf
const array = [1, 2, 3, 3, 3, 3, 4, 5];
const result = array.lastIndexOf(5);
console.log(result);

// map
const array = [
  { name: "freemen", age: 18 },
  { name: "vinko", age: 18 },
];
const result = array.map((item) => {
  if (item.name === "freemen") {
    return item;
  }
  return {};
});
console.log(result);

// reverse
const array = [1, 2, 3, 4, 5];
const result = array.reverse();
console.log(result);

// slice
const array = [1, 2, 3, 4, 5];
const result = array.slice(0, 3);
console.log(result);

// some
const array = [1, 2, 3, 4, 5];
const result = array.some((item) => {
  return item === 6;
});
console.log(result);

// sort
const array = [1, 2, 3, 4, 5];
const result = array.sort((a, b) => {
  return a - b;
});
console.log(result);

// toString
const array = [1, 2, 3, 4, 5];
const result = array.toString();
console.log(result);


