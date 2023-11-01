var showLogin=function(){
    console.log("用户登录");
}

var _showLogin = showLogin;

showLogin = function(){
    _showLogin();
    console.log("发射激光炮");
}

showLogin();