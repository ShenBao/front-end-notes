// 队列的实现
function Queue() {
  this.items = [];
}
//  添加元素
Queue.prototype.enqueue = function (element) {
  this.items.push(element);
};
//  删除元素
Queue.prototype.dequeue = function () {
  return this.items.shift();
};
// 返回队列中第一个元素
Queue.prototype.front = function () {
  return this.items[0];
};
// 判断队列是否为空
Queue.prototype.isEmpty = function () {
  return this.items.length === 0;
};
// 清空队列
Queue.prototype.clear = function () {
  this.items.length = 0;
};
// 获取队列的长度
Queue.prototype.size = function () {
  return this.items.length;
};
// 打印队列中元素
Queue.prototype.print = function () {
  console.log(this.items.toString());
};

var queue = new Queue();

console.log(queue.isEmpty()); // true

queue.enqueue("freemen");
queue.enqueue("vinko");
queue.enqueue("andy");

queue.print(); // freemen,vinko,andy
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
queue.dequeue();
queue.dequeue();
queue.print(); //andy
