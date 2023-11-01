
let oriBind: any, isOverride = false, oriToString: any;

const symbolKey = `__xyz_symbol_key_zyx__(~!@#$%^&*()_+)__`;

export const SymbolForBind = Symbol.for(`${symbolKey}`);

export function undoBind() {
    if (!isOverride) {
        return;
    }
    delete oriBind[SymbolForBind];
    Function.prototype.bind = oriBind;
    Function.prototype.toString = oriToString;
}

const { hasOwnProperty } = Object.prototype;
export function doBind() {
    oriBind = Function.prototype.bind;
    if (hasOwnProperty.call(oriBind, SymbolForBind) || isOverride) {
        return undoBind;
    }
    oriToString = Function.prototype.toString;

    const overrideBind: (thisArg: any, ...args: any[]) => Function = (
        function (oriBind) {
            return function overrideBind(this: any) {
                if (typeof this !== "function") {
                    throw new Error("必须是一个函数")
                }

                let fun: any;
                fun = oriBind.apply(this as any, arguments as any);
                if (hasOwnProperty.call(this, SymbolForBind)) {
                    fun[SymbolForBind] = this[SymbolForBind];
                } else {
                    fun[SymbolForBind] = this;
                }
                return fun;
            }

        }
    )(oriBind);

    (overrideBind as any)[SymbolForBind] = true;
    Function.prototype.bind = overrideBind;
    Function.prototype.toString = function (this:any) {
        if(hasOwnProperty.call(this, SymbolForBind)){
            return this[SymbolForBind].toString();
        }
        return oriToString.call(this);
    }
    isOverride = true;
    return undoBind;
}



