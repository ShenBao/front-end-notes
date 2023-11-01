 function methodReadonly(target, key, descriptor) {
    console.log("target=",target,"==key=",key,"==descriptor==",descriptor)
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    descriptor.writable = false;
    return descriptor;
}

function methodDecorator(moreHp = 0) {
    return function (target, key, descriptor) {
        //获取原来的方法
        const originalMethod = descriptor.value;
        //重写该方法
        descriptor.value = function (...args) {
            console.log("当前参数=", args[1])
            //增加血量hp
            args[1] = args[1] + moreHp;

            //注意,这里是this
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }
}

module.exports = {
    methodDecorator,
    methodReadonly
};