/* global todos, filters */

this.saveToLS = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

this.loadFromLS = () => {
    let todos = JSON.parse(localStorage.getItem('todos'))
    return (todos === null) ? [] : todos
}

const renderTodos = (todos, filters) => {
    const filteredTodos = todos
        .filter (i => i.text.toLowerCase().includes(filters.searchText.toLowerCase()))
        // .filter (i => filters.hideCompleted ? !i.completed : true)
        .filter (i => !filters.hideCompleted || !i.completed)

    const filTodosDiv = document.querySelector('#filtered-todos')
    filTodosDiv.innerHTML = ''
    filTodosDiv.appendChild(renderSummary(filteredTodos))
    filteredTodos.forEach (item => filTodosDiv.appendChild(buildTodoListUI (item)))
}

const renderSummary = filteredTodos => {
    const pending = filteredTodos.reduce((t, i) => i.completed? t : ++t, 0)
    const summary = document.createElement('h3')
    summary.textContent = `You have ${pending} items to do`
    return summary
}

const buildTodoListUI = (item) => {
    const l = document.createElement('label')

    const del = document.createElement('input')
    del.type = 'image'
    del.setAttribute('src', 'trash-can-icon-transparent-25.jpg')
    del.setAttribute('style', 'height:16px;width:16px;margin-right:5px')
    del.addEventListener ('click', () => {
        todos.splice(todos.findIndex(i => i.text === item.text), 1)
        this.saveToLS(todos)
        renderTodos(todos, filters)
    })
    l.appendChild(del)

    const chk = document.createElement('input')
    chk.type = 'checkbox'
    chk.checked = item.completed
    chk.addEventListener ('click', () => {
        item.completed = !item.completed
        this.saveToLS(todos)
        renderTodos(todos, filters)
    })

    const txt = document.createElement('label')
    txt.appendChild(chk)
    txt.insertAdjacentText('beforeend', ' ' + item.text)
    l.appendChild(txt)

    l.appendChild(document.createElement('br'))
    
    return l
}
