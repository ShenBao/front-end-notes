Function.prototype.after = function(afterFn){
    var __self= this;
    return function(){
        var ret = __self.apply(this,arguments);
        afterFn.apply(this,arguments);
        return ret;
    }
}

var showLogin=function(){
    console.log("用户登录");
}

var log=function(){
    console.log("上报日志");
}

showLogin = showLogin.after(log);

showLogin();
