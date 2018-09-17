/* global loadFromLS */
'use strict'

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
    const data = e.target.value.trim()
    if (data.length) setTodoText(todos, id, data)
    this.saveToLS(todos)
})

document.querySelector('#save-button').addEventListener('click', e => {
    e.preventDefault()
    location.assign('/index.html')
})
