const express = require("express")
const todosRouter = require('./todos/router') //include เชื่อม app.js กับ pookemon router
const app = express()

app.use(express.json())
app.use(todosRouter)

app.get("/", (req, res) => res.send({message:'Hello API'}))

module.exports = app