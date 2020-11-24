export const isAndroid = () => {
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  
  if (isAndroid) {
    //这个是安卓操作系统
    return true;
  } else {
    return false;
  }
  

}

export const isIOS = () => {
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isIOS) {
  　//这个是ios操作系统
    return true;
  } else {
    return false;
  }

}

/**
 * 对比 url 与 restUrl，返回 restUrl 中的请求参数
 * @param {请求链接} url 
 * @param {restful 链接} restUrl 
 */
export const getParamsFromRestful = (url, restUrl) => {
  const paramsUrl = url.split('/');
  const paramsRestUrl = restUrl.split('/');
  let diff = {};
  
  paramsUrl.forEach((item, index)=>{
    if(item !== paramsRestUrl[index]) {
      diff[paramsRestUrl[index].substr(1)] = item;
    }
  })
  
  return diff;
}