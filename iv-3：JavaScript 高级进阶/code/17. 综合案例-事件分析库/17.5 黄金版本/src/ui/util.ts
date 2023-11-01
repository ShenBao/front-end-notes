export const $ = function (selector: string) {
    return document.querySelector(selector);
}

export const $$ = function (selector: string) {
    return document.querySelectorAll(selector);
}

export const createEle = function (tagName: string, properties: Record<string, any> = {}){
    const el = document.createElement(tagName);
    for(let k in properties){
        el.setAttribute(k, properties[k]);
    }
    return el;
}