import React from 'react'
// import TodoList from './TodoList'
import FunctionalTodoList from './FunctionalTodoList'

class SimpleTodos extends React.Component {
    constructor() {
        super()

        this.state = {
            inputValue: '',
            list: [
                { id: 0, title: '吃饭' },
                { id: 1, title: '睡觉' },
            ]
        }
    }
    changeInputValue = (newValue) => {
        this.setState({
            inputValue: newValue
        })
    }
    createTodo = () => {
        const title = this.state.inputValue
        if (!title) return

        // 新增 todo - 正确处理 （ 不可变数据 - React ）
        const curList = this.state.list
        this.setState({
            list: curList.concat({
                id: curList.length,
                title
            })
        })
        // // 错误的处理示范
        // this.state.list.push({
        //     id: this.state.list.length,
        //     title
        // })

        // 清空输入框
        this.setState({
            inputValue: ''
        })
    }
    render() {
        return <div>
            <input
                value={this.state.inputValue}
                onInput={(e) => {this.changeInputValue(e.target.value)}}
            />
            <button onClick={this.createTodo}>创建</button>

            {/* <TodoList list={this.state.list}></TodoList> */}
            <FunctionalTodoList list={this.state.list}/>
        </div>
    }
}

export default SimpleTodos
