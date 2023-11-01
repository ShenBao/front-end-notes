var call = Function.prototype.call.call.bind(Function.prototype.call);

var person = {
    hello() {
        console.log('hello', this.name)
    }
}

call(person.hello, { "name": "tom" })