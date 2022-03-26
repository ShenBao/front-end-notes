try {
    throw "错误字符串";
} catch (e) {
    console.log(typeof e, "==name==", e.name, "===", e);
}

try {
    throw 22;
} catch (e) {
    console.log(typeof e, "==name==", e.name, "===", e);
}

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}


try {
    throw new UserException("无效异常");
} catch (e) {
    console.log(typeof e,"==name==", e.name, "===", e);
}