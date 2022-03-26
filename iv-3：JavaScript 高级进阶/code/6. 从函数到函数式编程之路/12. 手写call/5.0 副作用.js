var context = {
    fn: "i am fn",
    msg: "i am msg"
}

log.call(context);  // i am msg

console.log("msg:", context.msg); // i am msg
console.log("fn:", context.fn); // fn: undedined