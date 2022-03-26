function getStepIter(min, max, desc) {
    let [start, end, step] = desc ? [max, min, -1] : [min, max, 1];
    const hasNext = () => desc ? start >= end : end >= start;
    return {
        hasNext() {
            return hasNext()
        },
        get current() {
            return start;
        },
        next() {
            return start += step
        }
    }
}


var arr = [11, 22, 33, 44, 55, 66];

const stepIter = getStepIter(0, arr.length - 1, false);
while (stepIter.hasNext()) {
    console.log(stepIter.current, arr[stepIter.current]);
    stepIter.next()
}
