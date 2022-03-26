
const arr = Array.from({ length: 10000 }, (v, index) => {
  return {
    name: "name" + index,
    age: ~~(Math.random() * 100),
    sex: ~~(Math.random() * 10) / 2,
    p4: Math.random(),
    p5: Math.random() + '',
    p6: Math.random(),
    p7: Math.random(),
    p8: Math.random(),
    p9: Math.random(),
    p10: Math.random() + '',
  }
})

function deepClone_JSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function produce(obj, recipe) {
  console.time("deep clone")
  const newObj = deepClone_JSON(obj);
  console.timeEnd("deep clone")
  recipe(newObj);
  return newObj;
}

console.time("produce")
const arr1 = produce(arr, draft => {
  draft[500] = {};
  draft[500].name = "tom"
})
console.timeEnd("produce")
console.log("arr[500].name", arr[500].name);
console.log("arr1[500].name", arr1[500].name);
