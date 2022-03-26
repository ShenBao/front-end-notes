
const print = console.log;

const obj = {};

print('Symbol.ToPrimitive:', typeof obj[Symbol.ToPrimitive])
print('valueOf:', obj.valueOf())
const str = obj.toString();
print('toString:', ' type:', typeof str, ' value:', str)