import React from 'react'

class Example extends React.Component {
    constructor() {
      super()
      this.state = {
        val: 0
      }
    }

    componentDidMount() {
      // // 传入函数，state 不会合并
      // this.setState((prevState, props) => {
      //   return { val: prevState.val + 1 }
      // })
      // this.setState((prevState, props) => {
      //   return { val: prevState.val + 1 }
      // })

      this.setState({val: this.state.val + 1})
      console.log('a----', this.state.val) // 0
  
      this.setState(
        {val: this.state.val + 20},
        () => { console.log('newVal: ' + this.state.val) }
      )
      console.log('b----', this.state.val) // 20
  
      setTimeout(() => {
        this.setState({val: this.state.val + 1})
        console.log('c----', this.state.val) // 21
  
        this.setState({val: this.state.val + 1})
        console.log('d----', this.state.val) // 22
      }, 0)

      // // 手动 DOM 事件
      // document.getElementById('p1').addEventListener('click', () => {
      //   this.setState({val: this.state.val + 1})
      //   console.log('e----', this.state.val)
      // })
    }
  
    render() {
      return <p id="p1">setState demo: {this.state.val}</p>
    }
}

export default Example
