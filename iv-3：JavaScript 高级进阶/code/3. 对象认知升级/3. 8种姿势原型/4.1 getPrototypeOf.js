const print = console.log;

// null 和 undefined异常
Object.getPrototypeOf(null)
Object.getPrototypeOf(undefined)

// Uncaught TypeError: Cannot convert undefined or null to object

print(Object.getPrototypeOf(10n))
print(Object.getPrototypeOf(Symbol.for("a")))