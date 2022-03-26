
let loginEvent = new CustomEvent("login-over", {
    detail: "token"
});

function login() {
    setTimeout(() => {
        window.dispatchEvent(loginEvent);
    }, 3000);
}
