import React from 'react'

class TodoList extends React.PureComponent {
    componentDidUpdate() {
        // React 默认会让所有的子组件都更新，无论涉及的数据是否变化
        console.info('list updated')
    }
    render() {
        const { list = [] } = this.props

        return <ul>
            {list.map(todo => {
                const { id, title } = todo
                return <li key={id}>{title}</li>
            })}
        </ul>
    }
}

export default TodoList
