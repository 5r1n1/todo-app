/* global loadFromLS, renderTodos */

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
    todos.push({text: e.target.elements.todoText.value, completed: false})
    e.target.elements.todoText.value = ''
    renderTodos(todos, filters)
})
