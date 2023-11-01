
const print = console.log;

print('Symbol.ToPrimitive:', typeof [][Symbol.ToPrimitive])
print('valueOf:', [].valueOf())
const str = [].toString();
print('toString:', ' type:', typeof str, ' value:', str)