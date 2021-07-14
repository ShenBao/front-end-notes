/*
* 宏任务
*   分类： setTimeout setInterval requrestAnimationFrame
*   1. 宏任务所处的队列就是宏任务队列
*   2. 第一个宏任务队列中只有一个任务： 执行主线程的js代码
*   3. 宏任务队列可以有多个
*   4. 当宏任务队列的中的任务全部执行完以后会查看是否有微任务队列如果有先执行微任务队列中的所有任务，如果没有就查看是否有宏任务队列
*
* 微任务
*   分类： new Promise().then(回调) process.nextTick
*   1. 微任务所处的队列就是微任务队列
*   2. 只有一个微任务队列
*   3. 在上一个宏任务队列执行完毕后如果有微任务队列就会执行微任务队列中的所有任务
* */



console.log('----------------- start -----------------');

setTimeout(() => {
  console.log('setTimeout');
}, 0)

new Promise((resolve, reject) =>{
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  resolve();  // 修改promise实例对象的状态为成功的状态
}).then(() => {
  console.log('promise实例成功回调执行');
})

console.log('----------------- end -----------------');


/**


执行上下文   执行上下文对象

理解：代码执行的环境
时机：代码正式执行之前会进行到执行环境
工作：
  1. 创建变量对象
    1). 变量
    2). 函数及函数的参数
    3). 全局 window
    4). 局部：抽象的但是存在
  2. 确认 this 的指向
    1). 全局 this window
    2). 局部 this --- 调用其的对象
  3. 创建作用域链
    父级作用域链 + 当前变量对象
  4. 扩展
    ECObj = {
      变量对象：{变量、函数、函数的形参}
      scopeChain：父级作用域链 + 当前变量对象
      this：{ window | 调用其的对象 }
    }


 */








