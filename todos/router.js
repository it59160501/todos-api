const express = require("express")
const router = express.Router()
const todo = require('./todo')

function isSufficientParameter(v){
    return v !== null && v !== '' && v !== undefined 
}

router.get("/todos/all", (req, res) => res.send(todo.getListTodos()))

router.get("/todos/completed", (req, res) =>{ 
    res.send(todo.getTodosCompleted())
})

router.get("/todos/active", (req, res) =>{ 
    res.send(todo.getTodosActive())
})

router.get("/todos/number", (req, res) =>{ 
    res.send(todo.getNumberTodos())
})


router.post("/todos", (req, res) => {
    if(!isSufficientParameter(req.body.title)){
        res.status(400).send({error:'Insufficient parameter: title required parameter'})
        return 
    }
    let success = todo.addTodo(req.body.title)
    if(!success){
        res.status(400).send({error:'Create title is unsuccessfully'})
        return 
    }

    res.status(201).send(todo.getListTodos())
})

router.put('/todo/:id', (req, res) => {
    if(!isSufficientParameter(req.body.completed)){
        res.status(400).send({error:'Insufficient parameter: completed are required parameter'})
        return
    }
    
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'})
        return
    }

    let id = req.params.id

    if(!todo.isTodoExisted(id)){
        res.status(400).send({error:'Cannot update completed: completed is not found'})
        return
    }

    let t = todo.getTodoById(id)
    t.completed = req.body.completed
    let success = todo.updateCompleted(t)
    if(!success){
        res.status(400).send({error:'Update completed is unsuccessfully'})
        return 
    }

    res.status(200).send(todo.getListTodos())
})

router.put('/todo/:id/editTodo', (req, res) => {
    if(!isSufficientParameter(req.body.title)){
        res.status(400).send({error:'Insufficient parameter: title are required parameter'})
        return
    }
    
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'})
        return
    }

    let id = req.params.id

    if(!todo.isTodoExisted(id)){
        res.status(400).send({error:'Cannot update title: title is not found'})
        return
    }

    let t = todo.getTodoById(id)
    t.title = req.body.title
    let success = todo.editTodo(t)
    if(!success){
        res.status(400).send({error:'Update title is unsuccessfully'})
        return 
    }

    res.status(200).send(todo.getListTodos())
})

router.delete('/todo/:id', (req, res) => {
    if(!isSufficientParameter(req.params.id)){
        res.status(400).send({error:'Insufficient parameter: id are required parameter'})
        return
    }
    let id = req.params.id
    if(!todo.isTodoExisted(id)){
        res.status(400).send({error:'Cannot delete Todo: Todo is not found'})
        return
    }
    todo.removeTodo(id)
    res.status(204).send(todo.getListTodos())
})

router.delete('/todos', (req, res) => {
    todo.removeCompleted()
    res.status(204).send(todo.getListTodos())
})

module.exports = router