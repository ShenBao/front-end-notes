// 栈的实现
function Stack() {
  this.items = [];
}
// 添加元素的方法
Stack.prototype.push = function (element) {
  this.items.push(element);
};
// 移除栈顶的元素
Stack.prototype.pop = function () {
  this.items.pop();
};
// 拿栈顶的元素
Stack.prototype.peek = function () {
  return this.items[this.items.length - 1];
};
// 判断栈是否为空
Stack.prototype.isEmpty = function () {
  return this.items.length === 0;
};
// 清除栈
Stack.prototype.clear = function () {
  this.items = [];
};

const stack = new Stack();

stack.push({ number: 1 });
stack.push({ number: 2 });
stack.push({ number: 3 });
stack.push({ number: 4 });
stack.push({ number: 5 });
stack.push({ number: 6 });
stack.push({ number: 7 });
stack.push({ number: 8 });
stack.push({ number: 9 });
stack.push({ number: 10 });
// console.log(stack);

stack.pop();
// console.log(stack);

const result = stack.peek();
// console.log(result);
stack.clear();
const empty = stack.isEmpty();
console.log(empty);
