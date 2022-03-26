console.log("delete null     :", delete null);
console.log("delete 11       :", delete 11);
console.log("delete undefined:", delete undefined);

a = { c: 12 };
console.log("delete a        :", delete a);

var b = 12;
console.log("delete b        :", delete b);

console.log("delete xxxxxxxxx:", delete xxxxxxxxx);

var obj = ({})
console.log("delete .toString:", delete obj.toString);
console.log("obj.toString:", obj.toString);