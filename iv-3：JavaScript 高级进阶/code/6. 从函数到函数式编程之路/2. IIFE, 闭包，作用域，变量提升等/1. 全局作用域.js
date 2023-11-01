var name = "global的name";

function getName() {
    let name = "getName的name";
    console.log("getName:", name);
}

{
    console.log("块级作用域name", name);
}

console.log("全局作用域:", name);

getName();



var globalName = "globalName";
function getName(){
    var name = "getName的name";
    {
        console.log("name:", globalName)
    }
};
getName();