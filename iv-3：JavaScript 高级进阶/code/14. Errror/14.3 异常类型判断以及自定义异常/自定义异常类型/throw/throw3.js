try {
   throw 500;
} catch (e) {
   if (e <= 50) {
      console.log("已处理");
   } else {
      // 异常无法处理，重新抛出
      throw e;
   }
}