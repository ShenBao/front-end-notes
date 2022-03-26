import { isIndexLike, isObject } from ".";
import stringToPath from "./string"

/**
 * 获取对象属性
 * https://github.com/lodash/lodash/blob/master/.internal/baseGet.js
 * @param obj 
 * @param key 
 * @param defaultValue 
 * @returns 
 */
function getProperty(obj: Object, key: string, defaultValue: any = undefined) {

    if (!isObject(obj)) {
        return defaultValue;
    }

    const path = stringToPath(key);

    let index = 0;
    const length = path.length;

    while (obj != null && index < length) {
        obj = obj[path[index++]];
    }
    return (index && index == length) ? obj : undefined || defaultValue;
}

/**
 * 设置属性值
 * https://github.com/lodash/lodash/blob/master/.internal/baseSet.js
 * @param obj 
 * @param path 
 * @param value 
 * @returns 
 */
function setProperty(obj: Object, path: string, value: any = undefined) {

    if (!isObject(obj)) {
        return obj;
    }
    const keys = stringToPath(path);

    const length = keys.length;
    const lastIndex = length - 1;

    let index = -1;
    let nested = obj;

    while (nested != null && ++index < length) {
        const key = keys[index];
        let newValue = value;

        if (index != lastIndex) {
            const objValue = nested[key];
            newValue = undefined;
            if (newValue === undefined) {
                newValue = isObject(objValue) ? objValue : (isIndexLike[keys[index + 1]] ? [] : {})
            }
        }
        nested[key] = newValue;
        nested = nested[key];
    }
    return obj;
}

/**
 * 提取属性生成新的对象
 */
function extractObject(object: Object, kMap: Record<string, string> = null) {

    if (object === null || typeof object !== "object") {
        return object;
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



