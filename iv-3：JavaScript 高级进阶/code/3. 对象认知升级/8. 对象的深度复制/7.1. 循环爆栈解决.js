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
// 循环
function cloneDeep(x) {
    // 先设置默认值
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

        // 出栈
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = isArray(data) ? [] : {};
        }

        if (isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                // 避免一层死循环 a.b = a
                if (data[i] === data) {
                    res[i] = res;
                } else if (isCloneObject(data[i])) { // 需要深度复制的属性值
                    // 下一次循环， 入栈
                    loopList.push({
                        parent: res,
                        key: i,
                        data: data[i],
                    });
                } else {
                    res[i] = data[i];
                }
            }
        } else if (isObject(data)) {
            for (let k in data) {
                if (hasOwnProp(data, k)) {
                    // 避免一层死循环 a.b = a
                    if (data[k] === data) {
                        res[k] = res;
                    } else if (isCloneObject(data[k])) { // 需要深度复制的属性值
                        // 下一次循环
                        loopList.push({
                            parent: res,
                            key: k,
                            data: data[k],
                        });
                    } else {
                        res[k] = data[k];
                    }
                }
            }
        }
    }

    return root;
}

// console.log(cloneDeep({ a: 1, b: { fn: function () { } } }));
function createData(deep) {
    var data = {};
    var temp = data;

    for (var i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        temp[i + 1] = i + 1
    }

    return data;
}


const data = createData(10000);
// const f=JSON.parse(JSON.stringify(data));
// console.log(JSON.parse(JSON.stringify(data)));

// clone deep
const f = cloneDeep(data);
console.log("f==", f);


