import * as object from "./object";
const { mergeObject } = object;

interface MergeOptions<S = any, T = any> {
    /**
     * 降序
     */
    desc?: boolean;
    /**
     * 源键
     */
    sourceKey: string | ((data: S) => string);
    /**
     * 目标键
     */
    targetKey?: string | ((data: T) => string);

    /**
     * 键值映射关系
     */
    sKMap?: Record<string, string>;
}

const DEFAULT_MERGE_OPTIONS: MergeOptions = {
    sourceKey: "id",
    targetKey: undefined,
    desc: true,
    sKMap: undefined,
}

/**
 * 循环迭代器
 * TODO:: 对象形式
 * @param min 
 * @param max 
 * @param desc 
 * @returns 
 */
function getStepIter(min: number, max: number, desc: boolean) {

    let start = desc ? max : min;
    let end = desc ? min : max;

    if (desc) {
        return {
            hasNext() {
                return start >= end
            },
            get current() {
                return start;
            },
            next() {
                return --start

            }
        }
    }
    return {
        hasNext() {
            return end >= start
        },
        get current() {
            return start;
        },
        next() {
            return ++start
        }
    }
}

const MAX_WLAK_COUNT = 10000;
/**
 * 合并数组生成新的数组
 * @param targetArr 目标数组
 * @param sourceArr 需要被合并的数组
 * @param options.desc  是否是从后往前遍历
 * @param options.soureKey  源数组对象的key
 * @param options.targetKey  目标数组对象的key
 * @param options.sKMap  源复制map关系
 * @returns 
 */
export function mergeArray<S = any, T = any, R = any>(targetArr: T[] = [], sourceArr: S[] = [], options: MergeOptions<S, T> = DEFAULT_MERGE_OPTIONS): R[] {

    // 有一个不是数组
    if (!Array.isArray(sourceArr) || !Array.isArray(targetArr)) {
        // return [...targetArr] as any[];
        return targetArr as any;
    }

    const opt: MergeOptions = { ...DEFAULT_MERGE_OPTIONS, ...options };

    // 判断sourceKey和sourceProperties
    if (typeof opt.sourceKey !== "string") {
        console.error("无效的soureKey");
        return targetArr as any[];
    }

    const wTypes = ["string", "number"];

    // TODO:: 更安全的检查
    const getSKeyFn = typeof opt.sourceKey === "function" ? opt.sourceKey : (s: S) => s[opt.sourceKey as string];

    let { targetKey } = opt;
    if (targetKey == null) {
        targetKey = opt.sourceKey;
    }

    const getTKeyFn = typeof targetKey === "function" ? targetKey : (t: T) => t[opt.targetKey as string];

    const objMap: Record<string, S> = sourceArr.reduce((obj: Record<string, S>, cur: S) => {
        const key = getSKeyFn(cur);
        if (wTypes.includes(typeof key)) {
            obj[cur[key]] = cur
        }
        return obj;
    }, Object.create(null));

    const { desc, sourceKey, sKMap = null } = opt;

    const sourceLen = sourceArr.length;
    let hitCounts = 0;
    let walkCounts = 0;

    let resultArr = Array.from(targetArr);
    const targetLen = targetArr.length;
    let tempTObj, keyValue, tempSObj;

    const stepIter = getStepIter(0, targetLen - 1, desc);

    while (stepIter.hasNext()) {

        const index = stepIter.current;

        walkCounts++

        if (walkCounts > MAX_WLAK_COUNT) {
            console.error(`mergeArray 遍历次数超过最大遍历次数 ${MAX_WLAK_COUNT}, 终止遍历，请检查程序逻辑`);
            break;
        }

        tempTObj = resultArr[index];

        // 目标比对的键值
        keyValue = tempTObj[getTKeyFn(tempTObj)];
        if (keyValue == null || (tempSObj = objMap[keyValue]) == null || tempSObj[sourceKey] != keyValue) {
            stepIter.next()
            continue;
        }

        resultArr[index] = mergeObject(tempTObj, tempSObj, undefined, sKMap);
        hitCounts++
        if (hitCounts >= sourceLen) {
            break;
        }

        stepIter.next()
    }

    console.log(`mergeArray:: sourceArr(${sourceLen}), 统计：遍历次数${walkCounts}, 命中次数${hitCounts}`);
    return resultArr as any[];
}
