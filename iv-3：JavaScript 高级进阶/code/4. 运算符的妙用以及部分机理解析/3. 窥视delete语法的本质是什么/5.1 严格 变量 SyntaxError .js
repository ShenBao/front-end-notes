"use strict"

// 变量
var name = 'name';
delete name;

// 函数
function fn(){}
delete fn;

function fnArg(name){
    delete name;
}
fnArg();