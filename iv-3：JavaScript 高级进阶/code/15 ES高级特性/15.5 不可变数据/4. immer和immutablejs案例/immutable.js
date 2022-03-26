const { Map } = require("immutable");

const map1 = Map({ a: 1, b: 2, c: { cd: 1 } });

//getIn
console.log("map1:", map1.getIn(["c", "cd"]));
//set
const map2 = map1.set("b", 50);
console.log("map2:", map2.toJS());
//setIn
const map3 = map1.setIn(["c", "cd"], 50);
console.log("map3:", map3.toJS());
