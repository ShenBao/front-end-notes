// react 如何获取url中的参数
import React, { Component } from 'react'
import { withRouter } from 'next/router'
export default withRouter(class RouteComponent extends Component {
  handleClick = ()=>{
    const query = this.props.router.query;
    console.log(`query`, query);
  }
  render() {
    return (
      <button onClick={this.handleClick}>点击我吧</button>
    )
  }
})
// 面试官主要考察什么？
// react框架本身的熟悉程度

// 面试中遇到该题目我们该如何回答？
// withRouter 包装基础组件
// 基础组件的props中拿到我们路由的信息
