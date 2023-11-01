import React, { Component } from 'react'

export default class SetStateComponent extends Component {
  state= {
    count : 0
  }
  // 同步：原生事件和setTimeout 
  // componentDidMount() {
  //   setTimeout(()=>{
  //     this.setState({count: this.state.count+1});
  //     console.log(`this.state.count`, this.state.count);
  //   })
  //   const ele = document.getElementById('element');
  //   ele.onclick = ()=>{
  //     this.setState({count: this.state.count+1});
  //     console.log(`this.state.count`, this.state.count)
  //   }
  // }
  componentDidMount() {
    this.setState({count: this.state.count+1});
    console.log(`this.state.count`, this.state.count)
  }
  
  // 异步: react合成事件 生命周期钩子函数
  handleClick = ()=> { 
    this.setState({count: this.state.count+1});
    console.log(`this.state.count`, this.state.count)
  }
  render() {
    return (
      <div>
        <button id="element">add</button>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}
