class Todo{
    constructor(title){
        this.id=null
        this.title=title
        this.completed="uncompleted"
    }
}


let todos = []

mockTodo()

function mockTodo(){
    todos.push(createTodo('test'))
    todos.push(createTodo('test'))
}

function isTodoExisted(id){
    return todos[id-1] !== undefined && todos[id-1] !== null
}

function createId(num){
    return num + 1
}

function updateId(){
    for(i = 0 ; i < todos.length ; i++){
        todos[i].id = i+1
    }
    return true
}

function createTodo(title){
    let todo = new Todo(title)
    todo.id = createId(todos.length)
    return todo
}

function addTodo(title){
    let todo = createTodo(title)
    todos.push(todo)
    return true
}

function getListTodos(){
    return todos
}

function getTodosCompleted(){
    let tmp = []
    todos.forEach((todo)=> {
        if(todo.completed==="completed"){
            tmp.push(todos[todo.id-1])
        }
    });
    return tmp
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
    todos = todos.filter(todo => todo !== null)
    updateId()
}

function removeCompleted(){
    todos.forEach((todo)=> {
        if(todo.completed==="completed"){
            delete todos[todo.id-1]
        }
    });
    todos = todos.filter(todo => todo !== null)
    updateId()
}

function editTodo(todo){
    todos[todo.id-1] = todo
    return true
}

function getNumberTodos(){
    let tmp = []
    todos.forEach((todo)=> {
        if(todo.completed==="uncompleted"){
            tmp.push(todos[todo.id-1])
        }
    });
    return tmp.length + " items"
}

function getTodosActive(){
    let tmp = []
    todos.forEach((todo)=> {
        if(todo.completed==="uncompleted"){
            tmp.push(todos[todo.id-1])
        }
    });
    return tmp
}

module.exports.createTodo = createTodo

module.exports.addTodo = addTodo

module.exports.getListTodos = getListTodos

module.exports.isTodoExisted = isTodoExisted

module.exports.getTodoById = getTodoById

module.exports.updateCompleted = updateCompleted

module.exports.removeTodo = removeTodo

module.exports.removeCompleted = removeCompleted

module.exports.getTodosCompleted = getTodosCompleted

module.exports.editTodo = editTodo

module.exports.getNumberTodos = getNumberTodos

module.exports.getTodosActive = getTodosActive