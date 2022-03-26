function isFunction(fn) {
  return typeof fn === "function" || fn instanceof Function;
}

/**
 *
 *
 * @param {any} fn 需要延迟的方法
 * @param {any} delay 延迟时间
 * @param {any} context 上下文
 * @returns
 */
function delay(fn, delay, context) {
  let defaultDelay = delay || 5000;
  if (!isFunction(fn)) {
    return {
      run: () => Promise.resolve(),
      cancel: noop,
    };
  }
  let ticket;
  let executed = false;
  return {
    run(...args) {
      return new Promise((resolve, reject) => {
        if (executed === true) {
          return;
        }
        executed = true;
        ticket = setTimeout(async () => {
          try {
            const res = await fn.apply(context, args);
            resolve(res);
          } catch (err) {
            reject(err);
          } finally {
            clearTimeout(ticket);
          }
        }, defaultDelay);
      });
    },
    cancel: () => {
      clearTimeout(ticket);
    },
  };
}

//测试

const { run, cancel } = delay(() => {
  return "函数执行结果";
}, 3000);

run().then((result) => {
  console.log("result:", result);
});

run().then(() => {
  console.log("多次调用run result:", result);
});
