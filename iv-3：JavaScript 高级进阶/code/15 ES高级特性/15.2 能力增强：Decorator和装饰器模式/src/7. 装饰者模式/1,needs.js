

//登录
var showLogin=function(){
    console.log("用户登录");
}

//上报日志
var log=function(){
    console.log("上报日志");
}

//我们想在登录后，打印日志
//方案一:
var showLogin1=function(){
    showLogin();
    log();
}

showLogin1();

//方案二：直接修改showLogin
var showLogin=function(){
    console.log("用户登录");
    log();
}
