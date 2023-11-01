const TMap = function (options) {
  this.name = options.name;
  this.address = options.address;
};

// const map  = new TMap({
//   name: 'tmap',
//   address:"BJ"
// });

// console.log('map :>> ', map);

//1. 实例化对象  
// 2.返回值的问题: 构造函数中如果有值返回 那实例化后的对象就是这个返回值。

const ObjectFactory = (...args) => {
  const obj = {};
  const Constructor = [].shift.call(args);
  obj.__proto__ = Constructor.prototype;
  const ret = Constructor.apply(obj, args);
  return typeof ret === "object" ? ret : obj;
};

const map = ObjectFactory(TMap, { name: "MAP", address: "BJ" });

console.log("map :>> ", map);
