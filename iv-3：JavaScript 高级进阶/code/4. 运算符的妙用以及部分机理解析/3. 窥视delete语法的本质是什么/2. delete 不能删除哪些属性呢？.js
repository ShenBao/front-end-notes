
//var 
function testVar(){
    var a=1;
    console.log("delete var a：：：",delete a);
    console.log("var a ：：：",a);
}
testVar();


//let const,
function testLet(){
    let a=1;
    console.log("delete let a：：：",delete a);
    console.log("let a ：：：",a);
}
//作用域在testLet 中
testLet();




//不可配置的


var obj = {};
Object.defineProperty(obj, 'name', {configurable: false});

console.log("delete obj.name",delete obj.name);


console.log("delete undefined：：：",delete undefined);

console.log(Object.getOwnPropertyDescriptor(window,"undefined"));


console.log("delete Infinity：：：",delete Infinity);

console.log(Object.getOwnPropertyDescriptor(window,"Infinity"));


console.log("delete NaN：：：",delete NaN);

console.log(Object.getOwnPropertyDescriptor(window,"NaN"));


console.log("delete window：：：",delete window);

console.log(Object.getOwnPropertyDescriptor(window));


console.log("delete window.document：：：", delete window.document); 
Object.getOwnPropertyDescriptor(window, "document");

// 各种内置原型
console.log("delete Object.prototype：：：", delete Object.prototype); 
Object.getOwnPropertyDescriptor(Object, "prototype") 

// 内置Math的函数
console.log("delete Math.PI：：：", delete Math.PI); 
Object.getOwnPropertyDescriptor(Math, "PI") 



//函数
function fn() {}
console.log("delete fn：：：", delete fn); 
console.log(Object.getOwnPropertyDescriptor(window,"fn"))
