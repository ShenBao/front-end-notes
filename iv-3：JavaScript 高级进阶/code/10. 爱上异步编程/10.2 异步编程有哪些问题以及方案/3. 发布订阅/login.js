import MyMsgCenter from "./MsgCenter.js";

export function login() {
    setTimeout(() => {
        MyMsgCenter.dispatch("login-over",{ detail:"token" });
    }, 3000);
}

