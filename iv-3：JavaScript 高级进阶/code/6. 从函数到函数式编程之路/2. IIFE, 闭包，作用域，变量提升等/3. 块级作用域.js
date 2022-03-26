{
    let test="块级作用域";
    console.log("块级作用域:",test);
 }
 
 console.log("全局作用域:",test);

 function showTest() {
    console.log("函数作用域:",test);
 }

 showTest();



 for(var i=0;i<2;i++){
    console.log("for var=",i);
 }
 console.log("var:",i);



for(let j=0;j<2;j++){
    console.log("for let:",i);
}
console.log("let:",j);







