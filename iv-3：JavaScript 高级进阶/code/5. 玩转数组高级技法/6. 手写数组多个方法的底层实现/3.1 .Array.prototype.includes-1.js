Number.isNaN = function (param) {
  if (typeof param === "number") {
    return isNaN(param);
  }
  return false;
}

Array.prototype.includes = function (item, fromIndex) {
  // call, apply调用，严格模式
  if (this == null) {
    throw new TypeError('无效的this');
  }
  var O = Object(this);

  var len = O.length >> 0;
  if (len <= 0) {
    return false;
  }

  const isNAN = Number.isNaN(item);
  for (let i = 0; i < len; i++) {
    if (O[i] === item) {
      return true;
    } else if (isNAN && Number.isNaN(O[i])) {
      return true;
    }
  }
  return false;
};


const obj = { a: 3 };
const arr = [1, 2, 3, { a: 1 }, null, undefined, NaN, "", 0, obj, obj]

console.log("includes null:", arr.includes(null));
console.log("includes NaN:", arr.includes(NaN));