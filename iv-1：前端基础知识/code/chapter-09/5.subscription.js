// 顾客购买iphone13
class Apple {
  constructor() {
    this.queue = [];
  }
  push(obj) {
    this.queue.push({
      name: obj.name,
      fn: obj.fn,
    });
  }
  publish() {
    this.queue.forEach((item) => {
      item.fn(item.name);
    });
  }
}

const apple = new Apple();

apple.push({
  name: "freemen",
  fn(name) {
    console.log(`${name} receive iphine13`);
    console.log(`真香！`);
  },
});

apple.push({
  name: "vinko",
  fn(name) {
    console.log(`${name} receive iphine13`);
    console.log(`太香了！`);
  },
});

apple.publish();
