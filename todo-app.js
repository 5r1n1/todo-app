/* global loadFromLS, renderTodos, guid */

let todos = loadFromLS()
const filters = {searchText : '', hideCompleted: false}
renderTodos (todos, filters)

document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value
    renderTodos (todos, filters)
})

document.querySelector('#clear-search').addEventListener('click', () => {
    filters.searchText = ''
    document.querySelector('#search-text').value = ''
    renderTodos (todos, filters)
})

document.querySelector('#hide-completed').addEventListener('click', e => {
    filters.hideCompleted = e.target.checked
    renderTodos (todos, filters)
})

document.querySelector('#add-todo-form').addEventListener('submit', e => {
    e.preventDefault()
    if (e.target.elements.todoText.value.trim().length > 0) {
        todos.push({
            id: guid(),
            text: e.target.elements.todoText.value,
            completed: false
        })
        this.saveToLS(todos)
        renderTodos(todos, filters)
    }
    e.target.elements.todoText.value = ''
})
