/* global loadFromLS */

const id = location.hash.substring(1)
const todos = loadFromLS()

// const getTodoText = (todos, id) => todos.find(i => i.id === id).text
const getTodoText = (todos, id) => {
    const t = todos.find(i => i.id === id)
    if (t) return t.text
    else location.assign('/index.html')
}
const setTodoText = (todos, id, text) => todos[todos.findIndex(i => i.id === id)].text = text

window.onload = () => document.querySelector('#todo-text').value = getTodoText (todos, id)

document.querySelector('#todo-text').addEventListener('input', e => {
    if (e.target.value.trim().length) setTodoText(todos, id, e.target.value)
    this.saveToLS(todos)
})
