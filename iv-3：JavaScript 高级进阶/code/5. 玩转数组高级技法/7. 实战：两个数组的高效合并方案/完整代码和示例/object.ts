/**
 * 获取对象属性
 * @param obj 
 * @param key 
 * @param defaultValue 
 * @returns 
 */
function getProperty(obj: Object, key: string, defaultValue: any = undefined) {

    if (obj == null || typeof obj !== "object") {
        return defaultValue
    }

    // TODO:: 支持 a.b[0].c
    const val = obj[key];
    if (val == undefined) {
        return defaultValue
    }

    return val;
}

/**
 * 设置属性值
 * @param obj 
 * @param key 
 * @param value 
 * @returns 
 */
function setProperty(obj: Object, key: string, value: any = undefined) {
    if (obj == null || typeof obj !== "object") {
        return value
    }
    // TODO:: 支持 a.b[0].c
    obj[key] = value;
    return value;
}

/**
 * 提取属性生成新的对象
 */
function extractObject(object: Object, kMap: Record<string, string> = null) {

    if (object === null || typeof object !== "object") {
        return  object;
    }

    const ret = Object.create(null);
    if (kMap == null) {
        return Object.assign(ret, object);
    }
    Object.keys(kMap).reduce((obj: Object, key: string) => {
        // 只复制自己有的属性
        if (object.hasOwnProperty(key)) {
            setProperty(obj, kMap[key], getProperty(object, key))
        }
        return obj;
    }, ret);

    return ret;
}


/**
 * 合并对象生成新的对象
 * // TODO:: 无限合并
 * @param obj1 
 * @param obj2 
 * @param ob1KMap 
 * @param ob2KMap 
 * @returns 
 */
export function mergeObject<T = any, S = any, R = any>(
    obj1: T,
    obj2: S,
    ob1KMap: Record<string, string> = null,
    ob2KMap: Record<string, string> = null
): R {

    const ret = Object.create(null);

    Object.assign(ret, extractObject(obj1, ob1KMap));

    Object.assign(ret, extractObject(obj2, ob2KMap));

    return ret;

}
