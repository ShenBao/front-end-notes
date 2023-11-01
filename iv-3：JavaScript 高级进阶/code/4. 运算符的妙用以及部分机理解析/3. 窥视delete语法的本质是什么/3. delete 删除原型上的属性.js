function Foo() {
    this.bar = 10;
}
  
Foo.prototype.bar = 42;
  
var foo = new Foo();
  
// 返回 true，因为删除的是 foo 对象的自身属性
delete foo.bar;
  
// foo.bar 仍然可用，因为它在原型链上可用。
console.log("delete 删除自身属性：：：",foo.bar);   //42
  
// 从原型上删除属性
delete Foo.prototype.bar; //true
  
// 由于已删除“ bar”属性，因此不能再从Foo继承它。
console.log("delete 删除原型属性：：：",foo.bar);    //undefined