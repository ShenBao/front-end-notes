// const AutoPrefixer = require("autoprefixer");
// const px2rem = require("postcss-plugin-px2rem");
// module.exports = ({ file }) => {
//   let remUnit;
//   // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试
//   //link https://github.com/youzan/vant/issues/1181
//   if (file && file.dirname && file.dirname.indexOf("vant") > -1) {
//     remUnit = 37.5;
//   } else {
//     remUnit = 75;
//   }
//   return {
//     plugins: [
//       px2rem({
//         rootValue: remUnit,
//         minPixelValue: 3
//       })
//     ]};
// };