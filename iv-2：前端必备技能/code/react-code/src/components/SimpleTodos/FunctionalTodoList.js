import React from 'react'

function FunctionalTodoList(props) {
    console.log('todo list fn...')

    const { list = [] } = props
    return <ul>
        {list.map(todo => {
            const { id, title } = todo
            return <li key={id}>{title}</li>
        })}
    </ul> 
}

export default React.memo(FunctionalTodoList)
