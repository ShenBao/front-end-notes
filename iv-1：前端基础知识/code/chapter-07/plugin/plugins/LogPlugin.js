const  json = require('format-json');
const fs = require('fs');

class LogPlugin{
    constructor(options){
        this.options = options;
        // console.log(options);
    }
    apply(compiler){
        compiler.hooks.done.tapAsync('getStats',(stats)=>{
           const log =  json.plain(stats.toJson());
           const output = this.options.output;
           fs.writeFileSync(output,log);
        })
    }
}

module.exports = LogPlugin;