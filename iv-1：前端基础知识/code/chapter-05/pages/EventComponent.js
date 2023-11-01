import React, { Component } from 'react'

// render 执行一次
export default class EventComponent extends Component {
  state={
    count:0,
  }
  handleClick = ()=>{
    this.setState({count:this.state.count+1});
    this.setState({count:this.state.count+2});
  }
  render() {
    console.log('render :>> ');
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}
// setState 机制  内部会维护一个updaterQueue, 且会对同名的state属性进行一个覆盖。 