
function a() {
    console.log(this, typeof this, 'a')
};
function b() {
    console.log(this, typeof this,'b')
}
a.call.call(b, 'b')
a.call.call.call(b, 'b')
a.call.call.call.call(b, 'b')