const { toString, hasOwnProperty } = Object.prototype;

function hasOwnProp(obj, property) {
    return hasOwnProperty.call(obj, property)
}

function getType(obj) {
    return toString.call(obj).slice(8, -1).toLowerCase();
}

function isObject(obj) {
    return getType(obj) === "object";
}

function isArray(arr) {
    return getType(arr) === "array";
}

function isCloneObject(obj) {
    return isObject(obj) || isArray(obj)
}

function cloneDeep(x) {
    //使用WeakMap
    let uniqueData = new WeakMap();
    let root = x;

    if (isArray(x)) {
        root = [];
    } else if (isObject(x)) {
        root = {};
    }

    // 循环数组
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while (loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const source = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let target = parent;
        if (typeof key !== 'undefined') {
            target = parent[key] = isArray(source) ? [] : {};
        }

        // 复杂数据需要缓存操作
        if (isCloneObject(source)) {
            // 命中缓存，直接返回缓存数据
            let uniqueTarget = uniqueData.get(source);
            if (uniqueTarget) {
                parent[key] = uniqueTarget;
                continue; // 中断本次循环
            }

            // 未命中缓存，保存到缓存
            uniqueData.set(source, target);
        }

        if (isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                if (isCloneObject(source[i])) {
                    // 下一次循环
                    loopList.push({
                        parent: target,
                        key: i,
                        data: source[i],
                    });
                } else {
                    target[i] = source[i];
                }
            }
        } else if (isObject(source)) {
            for (let k in source) {
                if (hasOwnProp(source, k)) {
                    if (isCloneObject(source[k])) {
                        // 下一次循环
                        loopList.push({
                            parent: target,
                            key: k,
                            data: source[k],
                        });
                    } else {
                        target[k] = source[k];
                    }
                }
            }
        }
    }

    uniqueData = null;
    return root;
}

var obj = {
    p1: "p1",
    p2: ["p22", {
        p23: undefined,
        p24: 666
    }],
    null:null,
    p4:new RegExp(),
    p3:undefined,
    func: function () { console.log("func");return 1},
    Symbol: Symbol(2),
    bigint: BigInt(100),
};
obj.loop=obj;


const f=cloneDeep(obj);
console.log("f==",f);
