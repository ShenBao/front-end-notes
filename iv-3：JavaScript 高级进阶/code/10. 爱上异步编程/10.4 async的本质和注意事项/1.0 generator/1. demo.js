
function* numGenerator() {
    yield 1;
    yield 2;
    return 3;
}
var log = console.log;
var gen = numGenerator();
log(gen.next())  // {value: 1, done: false}
log(gen.next())  // {value: 2, done: false}
log(gen.next())  // {value: 3, done: true}
log(gen.next())  // { value: undefined, done: true }
