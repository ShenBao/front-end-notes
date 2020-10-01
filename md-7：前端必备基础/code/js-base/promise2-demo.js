// then() 一般正常返回  resolved 状态的  promise
const p1 = Promise.resolve().then(() => {
  return 100;
});
console.log('p1', p1); // resolved 状态的 promise，触发后续 then 回调
p1.then(() => {
  console.log('123');
});

// then() 里抛出错误，会返回  rejected 状态的  promise
const p2 = Promise.resolve().then(() => {
  throw new Error('err');
});
console.log('p2', p2); // rejected 状态的  promise，触发后续 catch 回调

p2.then(() => {
  console.log('456'); // 不能触发
}).catch((err) => {
  console.error('err p2', err); // 触发这里
});

// catch() 不抛出错误，会返回 resolved 状态的  promise
const p3 = Promise.reject().catch(() => {
  console.error('catch some error');
});
console.log('p3', p3); // 注意： resolved 状态的 promise；触发 then 回调

p3.then(() => {
  console.log('789');
});

// catch() 抛出错误，会返回 rejected 状态的  promise
const p4 = Promise.reject('my error').catch(() => {
  console.error('catch some error');
  throw new Error('err');
});
console.log('p4', p4); // rejected 状态的  promise，触发 catch 回调

p4.then(() => {
  console.log('233'); // 不能触发
}).catch((err) => {
  console.error('err p4', err); // 触发这里
});
