Function.prototype.unCurry = function () {
    const self = this
    return function () {
        return Function.prototype.call.apply(self, arguments)
    }
}

const dispatch = EventTarget.prototype.dispatchEvent.unCurry();

window.addEventListener("event-x", (ev) => {
    console.log("event-x", ev.detail);  // event-x ok
})

dispatch(window, new CustomEvent("event-x", { detail: "ok" }));

