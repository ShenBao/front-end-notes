// * 判断数据类型
// * 类数组转数组

// const array = [1,2,3,4];

// const type = Object.prototype.toString.call(array);

// console.log(`type`, type)

// const arrayLike = { 
//   0: "name",
//   1: "age",
//   2: "gender",
//   length: 3
// }

// const res =  Array.prototype.slice.call(arrayLike);
// console.log(`res`, res)
// // ["name","age","gender"]



// apply  对给定数组求最大值/最小值

// const array = [1,2,3,4,5];

// const max = Math.max.apply(null,array)
// const min = Math.min.apply(null,array)
// // Math.max(1,2,3,4,5)
// console.log(`max`, max)
// console.log(`min`, min)
// bind

class App extends React.Component {
  constructor(props) {
    super(props);  
    this.name = 'freemen'
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log(`this.name`, this.name)
  }
  render(){
    return (
      <button onClick={this.handleClick}>
        点击
      </button>
    )
  }
}