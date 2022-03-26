import { createStepUpGenerator } from "../";

const nextFactory = createStepUpGenerator(100);

let lastTime = Date.now();
nextFactory.start(function (this: any, next, ...args: any[]) {
  
    const now = Date.now();

    console.log("time:", Date.now());
    console.log("costt time", now - lastTime);
    lastTime = now;
    console.log(" ");

    next();
    next();
    next();
})