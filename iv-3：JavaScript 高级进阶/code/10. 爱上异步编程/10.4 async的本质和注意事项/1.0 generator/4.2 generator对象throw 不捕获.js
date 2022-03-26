function* generator() {
    var val = 1;
    while (true) {
        yield val++;
    }
}

var log = console.log;
var gen = generator();
gen.next(); // { value: 1, done: false }
log(gen.throw(new Error("Something went wrong"))); // "Error caught!"  {value: 2, done: false}
log(gen.next()); // { value: 3, done: false }