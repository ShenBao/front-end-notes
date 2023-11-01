const obj = {
    value: 10,
    valueOf(){
        return this;
    },
    toString(){
        return this;
    }
};

console.log(10 + obj);


