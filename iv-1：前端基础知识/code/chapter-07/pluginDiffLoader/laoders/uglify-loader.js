// loader 本质上就是一个函数
const UglifyJS = require('uglify-js');

module.exports = (source)=>{
  const result = UglifyJS.minify(source);
  console.log(source);
  return result.code;
}