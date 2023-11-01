function MyObject() {
    this.name = "myObject";
}

function MyObject2() {
    this.name = "myObject";
    return {
        name: 'myObject2'
    }
}

function MyObject3() {
    this.name = "myObject3";
    return undefined;
}


console.log(new MyObject());
console.log(new MyObject2());
console.log(new MyObject3());