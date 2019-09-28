class Todo{
    constructor(title){
        this.id=null
        this.title=title
        this.completed="uncompleted"
    }
}

let todos = []

function isTodoExisted(id){
    return todos[id-1] !== undefined && todos[id-1] !== null
}

function createId(num){
    return num + 1
}

function createTodo(title){
    let todo = new Todo(title)
    todo.id = createId(todos.length)
    return todo
}

function saveTodo(title){
    let todo = createTodo(title)
    todos.push(todo)
    return true
}

function getListTodos(){
    return todos
}

function getTodoById(id){
    return todos[id-1]
}

function updateCompleted(todo){
    todos[todo.id-1] = todo
    return true
}

function removeTodo(id){
    delete todos[id-1]
}

module.exports.createTodo = createTodo

module.exports.saveTodo = saveTodo

module.exports.getListTodos = getListTodos

module.exports.isTodoExisted = isTodoExisted

module.exports.getTodoById = getTodoById

module.exports.updateCompleted = updateCompleted

module.exports.removeTodo = removeTodo