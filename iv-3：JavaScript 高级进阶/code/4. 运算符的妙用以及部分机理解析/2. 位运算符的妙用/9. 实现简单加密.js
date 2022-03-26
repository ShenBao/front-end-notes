const password = 654;
const specialCharacter="`%_";

function encodeStr(str) {
    let result = '';
    str.split('').map(item => {
      result += handleCode(item,1);
    })
    return result;
}


function decodeStr(str) {
  let result = '';
  str.split(specialCharacter).map(item => {
     if(item.length>0 && /\d/.test(item)){
        result += handleCode(item,2);
     }else{
         item.split('').map(charItem => {
            result += handleCode(charItem,2);
         })
     }
 })
  
  return result;
}

function handleCode(str,type) {
    if (/\d/.test(str)) {
        //数字类型
        const r= str ^ password;
        if(type==2) return r;
        return specialCharacter + r +specialCharacter;
    } else {
      //字符类型，直接去code 码
      const code = str.charCodeAt();
      const newCode = code ^ password;
      //再次转换为字符
      return String.fromCharCode(newCode);
    }
}

const testStr = '嗨喽， 张三，hello35';
const result = encodeStr(testStr); 
console.log("encodeStr===",result);        
const decodeResult = decodeStr(result);   
console.log("decodeStr===",decodeResult);  



