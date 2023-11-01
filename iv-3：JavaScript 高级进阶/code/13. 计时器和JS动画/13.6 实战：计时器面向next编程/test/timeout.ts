import { createTimeoutGenerator } from "../";

const nextFactory = createTimeoutGenerator();

let context = {
    counts: 0
};

nextFactory.start(function cb(this: any, next: Function, ...args: any[]) {
    this.counts++;
    console.log("counts:", this.counts);
    console.log("args:", ...args);
    if (this.counts > 3) {
        nextFactory.cancel();
    }
    next(this, 3, 4, 5);

}, context, 1, 2, 3, 4);

