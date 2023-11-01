var handlerThrows = {
    setPrototypeOf(target, newProto) {
        throw new Error('custom error');
    }
};

var newProto = {}, target = {};
var p2 = new Proxy(target, handlerThrows);
// Object.setPrototypeOf(p2, newProto); // throws new Error("custom error")
Reflect.setPrototypeOf(p2, newProto); // throws new Error("custom error")


