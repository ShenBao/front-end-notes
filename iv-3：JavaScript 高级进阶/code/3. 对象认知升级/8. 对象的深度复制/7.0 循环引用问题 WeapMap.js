
const { hasOwnProperty } = Object.prototype;
function isObject(obj) {
    return obj !== null && typeof obj == "object";
}
function isArray(obj) {
    return Array.isArray(obj)
}
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

function deepClone(obj) {
    const wmap = new WeakMap();
    wmap.set(obj, 1);

    function deepCloneInner() {
        if (!isObject(obj)) return obj;
        const data = isArray(obj) ? [] : {};
        for (let key in obj) {
            const val = obj[key];
            if (hasOwn(obj, key)) {
                // 原始数据类型
                if (!isObject(val)) {
                    data[key] = val
                    continue;
                }
                if (wmap.has(val)) {
                    continue;
                }
                wmap.set(val, 1);
                data[key] = deepCloneInner(val);
            }
        }
        return data;
    }

    return deepCloneInner(obj);
}

// 循环引用
var obj2 = {
    name: "obj2"
};
obj2['obj2'] = obj2;
console.log(deepClone(obj2));
