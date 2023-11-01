import React, { Component } from 'react'

class Cat extends Component {
  render(){
    const mouse = this.props.mouse
    return (
      <img src="/favicon.ico" style={{position:"absolute",left:mouse.x,top: mouse.y}}/>
    )
  }
}

class Mouse extends Component {
  state= {
    x:0,
    y:0,
  }
  // 获取鼠标的x轴和y轴的信息
  handleMouseMove = (event)=>{
    const x = event.clientX;
    const y = event.clientY;
    //更新state 坐标值
    this.setState({
      x,
      y
    })
  }
  render(){
    return (
      <div style={{background:'red',height:'100vh'}} onMouseMove={this.handleMouseMove}>
        { this.props.render(this.state) }
      </div>
    )
  }
}

export default class MoseMove extends Component {
  render() {
    return (
      <div>
        <h1>鼠标移动</h1>
        <Mouse render={mouse=>(
          <Cat mouse={mouse}/>
        )}/>
      </div>
    )
  }
}
