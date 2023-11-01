function testReferenceError() {
    try {
        let a = undefinedVariable;
    } catch (e) {
        console.log("instanceof ReferenceError :", e instanceof ReferenceError); // true
    }
}

testReferenceError();
