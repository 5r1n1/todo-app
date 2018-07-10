/* global loadFromLS, deleteTodo */

const id = location.hash.substring(1)
const todos = loadFromLS()

const getTodoText = (todos, id) => todos.find(i => i.id === id).text
const setTodoText = (todos, id, text) => todos[todos.findIndex(i => i.id === id)].text = text

window.onload = () => document.querySelector('#todo-text').value = getTodoText (todos, id)

document.querySelector('#edit-todo-form').addEventListener('submit', e => {
    e.preventDefault()
    e.target.elements.todoText.value.trim().length > 0 ?
        setTodoText (todos, id, e.target.elements.todoText.value) :
        deleteTodo (todos, id)
    this.saveToLS(todos)
    location.assign('/index.html')
})

