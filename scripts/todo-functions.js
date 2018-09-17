/* global todos, filters */
'use strict'

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
    try {
        let todos = JSON.parse(localStorage.getItem('todos'))
        return todos ? todos : []
    } catch (e) { return []}
}

const renderTodos = (todos, filters) => {
    const filteredTodos = todos
        .filter(i => i.text.toLowerCase().includes(filters.searchText.toLowerCase()))
        // .filter(i => filters.hideCompleted ? !i.completed : true)
        .filter(i => !filters.hideCompleted || !i.completed)

    const filTodosDiv = document.querySelector('#filtered-todos')
    filTodosDiv.innerHTML = ''
    filTodosDiv.appendChild(renderSummary(filteredTodos))
    if (filteredTodos.length) 
        filteredTodos.forEach(item => filTodosDiv.appendChild (buildTodoListUI(item)))
    else {
        const emptyMsg = document.createElement('p')
        emptyMsg.textContent = 'No to-dos to show'
        emptyMsg.classList.add('empty-message')
        filTodosDiv.appendChild(emptyMsg)
    }
}

const renderSummary = filteredTodos => {
    const pending = filteredTodos.reduce((t, i) => i.completed? t : ++t, 0)
    const strItem = (pending === 1) ? 'todo' : 'todos'
    const summary = document.createElement('h4')
    summary.textContent = `You have ${pending} ${strItem} to do`
    summary.classList.add('list-title')
    return summary
}

const buildTodoListUI = (item) => {
    const elTodo = document.createElement('label')
    const elContainer = document.createElement('div')
    const chk = document.createElement('input')
    const txt = document.createElement('a')
    const btnRemove = document.createElement('button')

    chk.type = 'checkbox'
    chk.checked = item.completed
    chk.addEventListener('click', () => {
        item.completed = !item.completed
        this.saveToLS(todos)
        renderTodos(todos, filters)
    })
    elContainer.appendChild (chk)

    txt.setAttribute('href', `./edit-todo.html#${item.id}`)
    txt.textContent = item.text
    elContainer.appendChild(txt)

    elTodo.classList.add('list-item')
    elContainer.classList.add('list-item__container')
    elTodo.appendChild(elContainer)

    btnRemove.textContent = 'remove'
    btnRemove.classList.add('button', 'button--text')
    btnRemove.addEventListener('click', () => {
        deleteTodo(todos, item.id),
        renderTodos(todos, filters)
    })
    elTodo.appendChild(btnRemove)
   
    return elTodo
}

const deleteTodo = (todos, id) => {
    const index = todos.findIndex (i => i.id === id)
    if ((index + 1)) {
        todos.splice(index, 1)
        this.saveToLS(todos)
    }
}