
global.name = "global的name";
var fn = new Function(`console.log("name:", this.name)`,);

var obj = {
    name: "obj的name",
    fn
}
fn();
obj.fn();