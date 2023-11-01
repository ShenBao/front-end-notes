const obj = {};
Object.defineProperty(obj, "name", {
	value: "哈士奇"
});

const des = Object.getOwnPropertyDescriptor(obj, "name");

console.log("name:", des)
