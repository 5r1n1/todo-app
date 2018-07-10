/* global todos, filters */

this.guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    return s4() + s4() + '-' 
         + s4() + '-' + s4() + '-' + s4() + '-' 
         + s4() + s4() + s4()
}

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
    const summary = document.createElement('h4')
    summary.textContent = `You have ${pending} items to do`
    return summary
}

const buildTodoListUI = (item) => {
    const s = document.createElement('span')

    const del = document.createElement('input')
    del.type = 'image'
    del.setAttribute('src', 'del_icon.jpg')
    del.setAttribute('style', 'height:16px;width:16px;margin-right:5px')
    del.addEventListener ('click', () => {
        deleteTodo(todos, item.id),
        renderTodos(todos, filters)
    })
    s.appendChild(del)

    const chk = document.createElement('input')
    chk.type = 'checkbox'
    chk.checked = item.completed
    chk.addEventListener ('click', () => {
        item.completed = !item.completed
        this.saveToLS(todos)
        renderTodos(todos, filters)
    })

    const txt = document.createElement('a')
    txt.setAttribute('href', `/edit-note.html#${item.id}`)
    txt.appendChild(chk)
    txt.insertAdjacentText('beforeend', ' ' + item.text)
    s.appendChild(txt)

    s.appendChild(document.createElement('br'))
    
    return s
}

const deleteTodo = (todos, id) => {
    todos.splice(todos.findIndex(i => i.id === id), 1)
    this.saveToLS(todos)
}