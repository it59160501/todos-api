const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')

describe('Todos API',() => {
    describe('GET /todos', () => {
        it('should return list todos"',(done) =>{
            request(app).get('/todos')
            .expect(200)
            .end((err,res)=>{
                let todos = res.body
                expect(todos).to.be.an('array')
                let todo = todos[0]
                expect(todo).to.have.property('title');
                expect(todo).to.have.property('completed');
                done()
            })
        })
    })

    describe('POST /todos', () => {
        let totalTodos = 0

        beforeAll((done)=>{
            request(app).get('/todos')
            .end((err,res)=>{
                let todos = res.body
                totalTodos = todos.length
                done()
            })
        })

        it('should return 201 Create and have new todo',(done) =>{
            request(app).post('/todos')
            .send({title: 'test'})
            .set('Accept', 'application/json')
            .expect(201,done)
        })

        it('should remove todo successflly',(done) =>{
            request(app).post('/todos')
            .send({title: 'test'})
            .set('Accept', 'application/json')
            .expect(201)
            .end((res,req) => {
                request(app).get('/todos')
                    .end((err,res)=>{
                        let remaining = res.body.length
                        expect(remaining).to.above(totalTodos)
                        done()
                    })
            })
        })

        it('should return 400 Bad Request When missed required field',(done) =>{
            request(app).post('/todos')
            .expect(400).end((err,res)=>{
                let todos = res.body
                expect(todos).to.deep.equal({error:'Insufficient parameter: title required parameter'});
                done()
            })
        })
    })

    describe('PUT /todo/:id', () => {
        it('should return 200 OK and the todo has completed',(done) =>{
            request(app).put('/todo/1')
            .send({completed:'completed'})
            .set('Accept', 'application/json')
            .expect(200,done)
        })
        

        it('should return 400 Bad Request When try to update not existed todo',(done) =>{
            request(app).put('/todo/1')
            .expect(400).end((err,res)=>{
                let todos = res.body
                expect(todos).to.deep.equal({error:'Insufficient parameter: completed are required parameter'});
                done()
            })
        })
    })

    describe('DELETE /todo/:id', () => {
        let totalTodos = 0

        beforeAll((done)=>{
            request(app).get('/todos')
            .end((err,res)=>{
                let todos = res.body
                totalTodos = todos.length
                done()
            })
        })

        it('should remove todo successflly',(done) =>{
            request(app).delete('/todo/1')
            .expect(204)
            .end((res,req) => {
                request(app).get('/todos')
                    .end((err,res)=>{
                        let remaining = res.body.length
                        expect(remaining).to.below(totalTodos)
                        done()
                    })
            })
        })

    })
})