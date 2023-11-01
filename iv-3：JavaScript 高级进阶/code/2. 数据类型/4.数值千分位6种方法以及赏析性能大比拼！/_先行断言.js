const print = console.log;
print(/hello (?=[a-z]+)/.test("hello a"));
print(/hello (?=[a-z]+)/.test("hello 1"));  

