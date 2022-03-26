export function isObject(value: any) {
    const type = typeof value;
    return value != null && type === 'object';
}

const reIsUint = /^(?:0|[1-9]\d*)$/;

// https://github.com/lodash/lodash/blob/master/.internal/isIndex.js
export function isIndexLike(value: any) {
    const type = typeof value;
    return (type === 'number' ||
        (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0);
}