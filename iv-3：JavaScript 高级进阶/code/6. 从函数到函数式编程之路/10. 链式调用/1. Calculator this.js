class Calculator {
    constructor(val) {
        this.val = val;
    }

    double() {
        this.val = this.val * 2;
        return this
    }

    add(num) {
        this.val = this.val + num;
        return this
    }

    minus(num) {
        this.val = this.val - num;
        return this
    }

    multi(num) {
        this.val = this.val * num;
        return this
    }

    divide(num) {
        this.val = this.val / num;
        return this
    }

    pow(num) {
        this.val = Math.pow(this.val, num);
        return this
    }

    // ES5 getter, 表现得像个属性，实则是一个方法
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


