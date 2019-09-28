const express = require("express")
const router = express.Router()
const todo = require('./todo')

function isSufficientParameter(v){
    return v !== null && v !== '' && v !== undefined 
}

router.get("/todos", (req, res) => res.send(todo.getListTodos()))

router.post("/todos", (req, res) => {
    if(!isSufficientParameter(req.body.title)){
        res.status(400).send({error:'Insufficient parameter: title required parameter'})
        return 
    }
    let success = todo.saveTodo(req.body.title)
    if(!success){
        res.status(400).send({error:'Create title is unsuccessfully'})
        return 
    }

    res.sendStatus(201)
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

    res.sendStatus(200)
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
    res.sendStatus(204)
})

module.exports = router