function getStepIter(min, max, desc) {

    let start = desc ? max : min;
    let end = desc ? min : max;

    if (desc) {
        return {
            hasNext() {
                return start >= end
            },
            get current() {
                return start;
            },
            next() {
                return --start

            }
        }
    }
    
    return {
        hasNext() {
            return end >= start
        },
        get current() {
            return start;
        },
        next() {
            return ++start
        }
    }
}