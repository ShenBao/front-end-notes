class Calculator {
    constructor(val) {
        this.val = val;
    }

    double() {
        const val = this.val * 2;
        return new Calculator(val)
    }

    add(num) {
        const val = this.val + num;
        return new Calculator(val)
    }

    minus(num) {
        const val = this.val - num;
        return new Calculator(val)
    }

    multi(num) {
        const val = this.val * num;
        return new Calculator(val)
    }

    divide(num) {
        const val = this.val / num;
        return new Calculator(val)
    }

    pow(num) {
        const val = Math.pow(this.val, num);
        return new Calculator(val)
    }

    get value() {
        return this.val;
    }
}

const cal = new Calculator(10);

const val = cal.add(10) // 20
    .minus(5) // 15
    .double() // 30
    .multi(10) // 300
    .divide(2) // 150
    .pow(2)   // 22500
    .value;
console.log(val); // 22500


