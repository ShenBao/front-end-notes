/**
 * @param {any} fn 需要延迟的方法
 * @param {any} delay 延迟时间
 * @param {any} context 上下文
 * @returns
 */
function delay(fn, delay, context) {
  let defaultDelay = delay || 5000;
  let ticket;
  return {
    run(...args) {
      ticket = setTimeout(async () => {
        fn.apply(context, args);
      }, defaultDelay);
    },
    cancel: () => {
      clearTimeout(ticket);
    },
  };
}

const { run, cancel } = delay(() => {
  console.log("111");
}, 3000);

run();

setTimeout(() => {
  cancel();
}, 1000);
