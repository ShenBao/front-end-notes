
function getParents(el) {
    if (typeof el !== "object" || el === null) {
        throw new Error("el应该是一个对象")
    }
    var _el = el;
    var result = [];
    while (_el.__proto__ !== null) {
        result.push(_el.__proto__.constructor.name);
        _el = _el.__proto__;
    }
    return result;
}

