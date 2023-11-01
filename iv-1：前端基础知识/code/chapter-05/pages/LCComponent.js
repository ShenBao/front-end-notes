import React, { Component } from 'react'

//1. getDerivedStateFromProps 的返回值会更新当前组件的states
//2. shouldComponentUpdate 返回true或者false来决定是否更新当前组件
//3. getSnapshotBeforeUpdate的返回值会作为componentDidUpdate的第三个参数

export default class LCComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "freemen"
    }
    console.log(`constructor`)
  }
  // getDerivedStateFromProps 返回值用来更新当前组件的states
  static getDerivedStateFromProps(props,state){
    console.log(`getDerivedStateFromProps`)
    if(state.name==='freemen'){
      return { name: "vinko" }
    }
    return null;
  }
  componentDidMount(){
    console.log(`componentDidMount`)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(`shouldComponentUpdate`)
    return true;
  }
  getSnapshotBeforeUpdate(){
    console.log(`getSnapshotBeforeUpdate`)
    return { snapshot: "snapshot" }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(`componentDidUpdate`)
  }
  componentWillUnmount(){
    console.log(`componentWillUnmount`)
  }
  handleClick = () => {
    this.setState({
      name:"react生命周期"
    })
  }
  render() {
    console.log(`render`)
    return (
      <div>
        { this.state.name }
        <button onClick={this.handleClick}>update</button>
      </div>
    )
  }
}
