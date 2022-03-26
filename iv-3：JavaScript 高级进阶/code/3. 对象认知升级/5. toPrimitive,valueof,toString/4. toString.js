// Array 
let arr = [1, 2, 5]
// Object 
let user = {
    name: "Jason",
    age: 24
}

//Date
let now = new Date()

// Function
function fun() {
    return 10;
}
console.log("Array:", arr.toString())
console.log("Object:", user.toString())
console.log("Date:", now.toString())
console.log("Function:", fun.toString())  

// hint 是  default， valueOf => toString
console.log(1 + now)
