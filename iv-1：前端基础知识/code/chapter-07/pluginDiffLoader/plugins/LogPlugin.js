const json = require('format-json');
const fs = require('fs');

class LogPlugin{
    constructor(options){
       this.options = options;
    }
    apply(compiler){ 
        compiler.hooks.run.tap('run',()=>{
            console.log('start run');
        })
        compiler.hooks.done.tapAsync('getStats',(stats)=>{
        console.log(this.options);
        //    stats.compilation.modules.forEach((item)=>{
        //        const source = item['resource'];
        //        const data = fs.readFileSync(source,{encoding:'utf8'})
        //        console.log(data);
        //    })
           const log =  json.plain(stats.toJson());
           const output = this.options.output;
           fs.writeFileSync(output,log);
        })
    }
}

module.exports = LogPlugin;
// 1 功能： loader做的事情 plugin也可以做
// 2. 执行顺序：
//     Plugin 可以在 webpack 编译的整个过程执行，类比 React\Vue 生命周期
//     Loader 只能在固定的阶段执行
// 3. 本质上
//     Loader 本质上是一个翻译官对客户端识别不了的源码进行处理
//     Plugin 执行的是一些副操作