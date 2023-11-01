const print = console.log;

print('\\141:', '\141')  // a

// 我们看一些特殊码点的字符，因为码点为31和127的字符，不能被显示或者表示
// 浏览器和nodejs得输出情况不一样
// 37 = 31..toString(8) 
print('\37') 

// 177 = 127..toString(8) 
print('\177')
print('\x7F')
