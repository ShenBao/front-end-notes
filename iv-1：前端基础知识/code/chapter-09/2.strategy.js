// 策略模式   有效的解决if else 逻辑复杂不可维护的情况
// s a b c d
// 5 4 3 2 1
// a   b
let strategys = {
  s(base) {
    console.log("女朋友");
    console.log("iphone");
    return base * 5;
  },
  a(base) {
    console.log("书包");
    return base * 4;
  },
  b(base) {
    return base * 3;
  },
  c(base) {
    return base * 2;
  },
  d(base) {
    return base;
  },
  e(base) {
    return 0;
  },
};

function catulateBonus(base, grade) {
  return strategys[grade](base);
}

// function catulateBonus(base,grade){
//     if(grade==='s'){
//       console.log('女朋友');
//       console.log('iphone');
//       return base*5;
//     }else if(grade==='a'){
//       console.log('书包');
//       return base*4;
//     }else if(grade==='b'){
//       console.log('对联');
//       return base*3;
//     }else if(grade==='c'){
//       return base*2;
//     } else if(grade==='d'){
//       return base*1;
//     } else {
//       return 0;
//     }
// }
// // 老王
// const result  = catulateBonus(1000,'s');
// console.log(result);
// // 小明
// const resulta  = catulateBonus(2000,'a');
// console.log(resulta);
