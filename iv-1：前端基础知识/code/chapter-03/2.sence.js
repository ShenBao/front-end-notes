//  小王去面试

// 小王去招聘会现场参加面试 招聘的企业是腾讯和阿里 
// 腾讯和阿里的面试官分别是 freemen 和 vinko, 阿里的vinko 临时有事请腾讯的freemen来帮忙
// freemen 来到阿里的面试现场谁 你好我是vinko 我的公司是阿里

const Tencent ={
  name: "freemen",
  company: "Tencent",
  time:"2021-11-31",
  address:"BeiJing",
  say(company){
    console.log(`my name is `, this.name);
    console.log(`my company is `, company);
  }
}

const Alibaba = {
  name:"vinko",
  time:"2021-11-31",
  address: "BeiJing",
  say(company){
    console.log(`my name is `, this.name);
    console.log(`my company is `, company);
  }
}

// 
// Tencent.say('Tencent');
// freemen 替 vinko 面试
// Tencent.say.call(Alibaba,'Alibaba');

// Tencent.say.apply(Alibaba, ['Alibaba'])

const say = Tencent.say.bind(Alibaba, 'Alibaba');
say();

// 总结

// call 和 apply 传参方式不同
// bind 返回值是函数  