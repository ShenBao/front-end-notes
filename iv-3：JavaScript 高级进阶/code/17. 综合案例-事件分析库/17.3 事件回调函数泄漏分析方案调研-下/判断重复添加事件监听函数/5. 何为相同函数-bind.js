function a(){
    console.log("name:", this.name)
}

console.log("name:", a.name, ",content:", a.toString())
var b = a.bind({})
console.log("name:", b.name, ",content:", b.toString())
// name: bound a ,content: function () { [native code] }