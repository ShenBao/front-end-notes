

function getName() {
    var test = "函数作用域";
    console.log("函数作用域test=", test);
}


{
    console.log("块级作用域test=", test);  //ReferenceError: test is not defined

}

console.log("全局作用域test=", test); //ReferenceError: test is not defined

getName();