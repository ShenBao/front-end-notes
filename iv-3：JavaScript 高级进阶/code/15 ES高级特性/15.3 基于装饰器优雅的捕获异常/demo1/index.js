const { methodCatch } = require("./methodCatch.js");
const { CatchError } = require("../CatchError");

class DemoClass {

  @methodCatch({ message: "创建订单失败", toast: true, report: true, log: true })
  async createOrder() {
    // a.b();

    throw new CatchError("创建订单失败了，请联系管理员", {
      toast: true,
      report: true,
      log: false
    });
  }
}

const demo = new DemoClass();
demo.createOrder();
