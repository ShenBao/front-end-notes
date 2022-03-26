function a() {
    console.log(this, 'a')
};
function b() {
    console.log(this, 'b')
}

a.call(b);
a.call.call(b, 'b')