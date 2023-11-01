function origin(a, b) {
  console.log(this.name);
  console.log([a, b]);
}

const obj = {
  name: "freemen",
};

// const func = origin.bind(obj,2);
// func(1)

Function.prototype.bindFn = function () {
  // 1 获取源函数
  const fn = this;
  // 2 获取目标对象
  const obj = arguments[0];
  // 3. 获取源函数参数列表
  const args = [].slice.call(arguments, 1);
  // 4. 返回函数
  return function () {
    // 5 获取返回函数的参数列表
    const returnArgs = [].slice.call(arguments);
    // 6 执行源函数
    fn.apply(obj, args.concat(returnArgs));
  };
};
