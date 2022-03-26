function log() {
    console.log("name:", this.name);
}

var oriBind = Function.prototype.bind;
var SymbolOriBind = Symbol.for("__oriBind__");
Function.prototype.bind = function () {
    var f = oriBind.apply(this, arguments);
    f[SymbolOriBind] = this;
    return f;
}

const boundLog = log.bind({ name: "哈哈" });
console.log("log:", boundLog[SymbolOriBind].toString());

