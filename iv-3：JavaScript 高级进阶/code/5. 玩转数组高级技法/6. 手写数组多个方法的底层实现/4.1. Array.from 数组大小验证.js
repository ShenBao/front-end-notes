

const max = Math.pow(2, 32);

console.log("Array.from:", Array.from({ 0: 1, 1: 2, length: max - 1 }));

console.log("Array.from:", Array.from({ 0: 1, 1: 2, length: max }));