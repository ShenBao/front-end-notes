
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
});

function produce(obj, recipe) {
  const state = {
    base: obj,  // 基础对象
    copy: {},   // 被更改后得数据
    draft: {},  // 代理信息
    currentKey: 0 // 当前操作的key
  };

  // 代理数据里面具体得某条数据得读写
  // arr[500].name 
  const handlerItem = {
    get(target, property, receiver) {

      // 优先从copy里面读取
      if (state.copy[state.currentKey]) {
        return state.copy[state.currentKey][property];
      }
      // 从基础对象里面读取
      return state.base[state.currentKey][property];
    },
    set(target, property, value, receiver) {
      console.log("set:", property, value);
      return Reflect.set(state.copy[state.currentKey], property, value);
    }
  }

  // 代理数组得读写
  const handler = {
    get(target, property, receiver) {
      console.log("get:", property);
      state.currentKey = property;

      // arr[500].name = x
      // 如果读取，就进一步代理某个具体的对象
      if (!state.draft[property]) {
        const val = { ...(state.base[property]) };
        const proxy = new Proxy(val, handlerItem);
        state.draft[property] = proxy;
        state.copy[property] = val;
      }
      return state.draft[property];
    },
    set(target, property, value, receiver) {
      console.log("set:", property, value);
      Reflect.set(state.copy, property, value);
      console.log("state.copy[property]", state.copy)
    }
  }
  const proxyObj = new Proxy(obj, handler)
  //传递代理对象出去
  recipe(proxyObj);
  return proxyObj;
}

console.time("produce")
const arr1 = produce(arr, draft => {
   //draft为代理对象
  draft[500] = {};
  draft[500].name = "tom";
})
console.timeEnd("produce")

console.log()
console.log("arr[500].name", arr[500].name);
console.log("arr1[500].name", arr1[500].name);

