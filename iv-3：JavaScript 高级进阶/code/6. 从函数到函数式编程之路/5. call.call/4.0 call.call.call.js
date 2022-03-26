function a() {
    console.log(this, 'a')
};
function b() {
    console.log(this, 'b')
}

var log = console.log;

log(a.call === Function.prototype.call);
log(a.call === a.call.call);
log(a.call === a.call.call.call);
