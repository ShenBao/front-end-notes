import React, { Component } from 'react'

export default class JSXComponent extends Component {
  handleClick = ()=> {
    console.log(`click`)
  }
  render()  {
    const jsx = React.createElement('div',{name:'freemen'},'react')
    return (
      <div onClick={this.handleClick}>
        {jsx}
      </div>
    )
  }
}

// jsx 本质是一个语法糖
// @babel/presets-react 
// 生成虚拟DOM
// render
