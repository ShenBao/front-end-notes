function a() {
    console.log(this, 'a')
};
function b() {
    console.log(this, 'b')
}

a.call(b);

