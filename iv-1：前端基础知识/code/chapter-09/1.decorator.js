// 装饰者模式
// 不改变对象自身代码的基础上新增功能
let a = () => {
  console.log("a");
};
// 开闭原则
// let newa = ()=>{
//     console.log('a');
//     console.log('b');
// }

// newa();

let newa = () => {
  a();
  console.log("b");
};
// newa()
// 飞机大战  发射普通子弹   发射导弹   发射原子弹

function Plane() {}
Plane.prototype.fire = function () {
  console.log("普通子弹");
};

function MissileDecorator(plane) {
  this.plane = plane;
}

MissileDecorator.prototype.fire = function () {
  this.plane.fire();
  console.log("导弹");
};

function AtomDecorator(plane) {
  this.plane = plane;
}

AtomDecorator.prototype.fire = function () {
  this.plane.fire(); // 普通子弹 导弹
  console.log("原子弹");
};

let plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();
