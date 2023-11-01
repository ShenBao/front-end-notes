// 代理模式   转发请求
// 情景剧: 梁山伯与祝英台的故事
// 梁山伯把玫瑰送给媒婆 并委托替他向祝英台表白
// 鲜花
function Flower(owner, name) {
  this.owner = owner;
  this.name = name;
}
// 主角: 梁山伯
let liangShanbo = {
  sendFlower(target) {
    let flower = new Flower("liangShanbo", "rose");
    target.receiveFlower(flower);
  },
};
// 二号主人公: 媒婆
let matchMaker = {
  receiveFlower(flower) {
    zhuYingTai.receiveFlower(flower);
  },
};
// 女主角: 祝英台
let zhuYingTai = {
  receiveFlower(flower) {
    console.log(`zhuYingTai receive ${flower.name} from ${flower.owner}`);
  },
};

// 梁山伯把玫瑰送给媒婆 并委托替他向祝英台表白
liangShanbo.sendFlower(matchMaker);
