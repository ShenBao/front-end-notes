function createFun(argsLength) {
    // return ctx[propertyName](arg1, arg2, arg3,...)
    // 拼接函数
    var code = 'return ctx[propertyName](';
    // 拼接参数, 第二个起是参数
    for (var i = 0; i < argsLength; i++) {
        if (i > 0) {
            code += ',';
        }
        code += 'args[' + i + ']';
    }
    code += ')';
    return new Function('ctx', 'propertyName', 'args', code);
}


console.log(createFun(3).toString())

/*
ƒ anonymous(ctx,propertyName,args
) {
return ctx[propertyName](args[0],args[1],args[2])
}
*/

var obj = {
    log(...args) {
        console.log("msgs:", ...args)
    }
}

function log(...args){
    createFun(args.length)(obj, "log", [...args])
}

log("msg1", "msg2", "msg3");


